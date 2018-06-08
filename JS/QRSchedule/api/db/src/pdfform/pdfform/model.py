import json
import logging
from datetime import datetime
import base64

import aiohttp
import requests

forms_data = {}
templates = {}

"""
Verge rendering API for python
"""


# Internal metadecorator for parametrized decorators
def _parametrized(dec):
    def layer(*args, **kwargs):
        def repl(f):
            return dec(f, *args, **kwargs)

        return repl

    return layer


# Internal function to store field descriptor
def _store_field(base, type, name, data):
    logging.debug(f"Store field {type}:{name} to {data}")
    if not base in forms_data.keys():
        forms_data[base] = {}

    if not type in forms_data[base].keys():
        forms_data[base][type] = {}

    forms_data[base][type][name] = data


@_parametrized
def text(fn, name, **kwargs):
    """
    Text value definition (with options)
    
    name - field name in template
    
    Options (**kwargs):
    size - max string length (or will be truncated)
    default - default value for undefined or empty string
    """

    def wrapped(obj, **kwargs):
        string_data = fn(obj)
        data_type = type(string_data)
        if data_type is not str:
            raise Exception(f"{fn} returned {data_type}, string needed.")

        if "default" in kwargs.keys() and (string_data is None or string_data is ""):
            logging.debug(f"Defaulting {name} to {kwargs['default']}")
            string_data = kwargs["default"]
        if "size" in kwargs.keys():
            logging.debug(f"Limit {name} to {kwargs['size']}")
            string_data = string_data[:kwargs["size"]]
        return string_data

    logging.debug(f"Registering string field: {name} {fn}")
    qn = fn.__qualname__.split(".")

    _store_field(qn[len(qn) - 2], "strings", name, {
        "func": wrapped,
        "kwargs": kwargs
    })

    return wrapped


@_parametrized
def incut(fn, name, **kwargs):

    def wrapped(obj, **kwargs):
        int_data = fn(obj)
        data_type = type(int_data)
        if data_type is not int:
            raise Exception(f"{fn} returned {data_type}, int needed.")
        return int_data

    logging.debug(f"Registering incut: {name} {fn}")
    qn = fn.__qualname__.split(".")

    _store_field(qn[len(qn) - 2], "incuts", name, {
        "func": wrapped,
        "kwargs": kwargs
    })


@_parametrized
def table(fn, name, **kwargs):
    """
    Table value definition
    """

    def wrapped(obj, **kwargs):
        return fn(obj)

    logging.debug(f"Registering table field: {name} {fn}")
    qn = fn.__qualname__.split(".")

    _store_field(qn[len(qn) - 2], "tables", name, {
        "func": wrapped,
        "kwargs": kwargs
    })

    return wrapped


@_parametrized
def choice(fn, name, **kwargs):
    def wrapped(obj, **kwargs):
        value = fn(obj)
        if value in kwargs["mapping"].keys():
            logging.debug(f"Mapping {name} : {value} -> {kwargs['mapping'][value]}")
            return value
        if "default" in kwargs.keys():
            return kwargs["default"]
        raise ValueError("Incorrect choice value")

    logging.debug(f"Registering choice field: {name} {fn}")
    qn = fn.__qualname__.split(".")
    _store_field(qn[len(qn) - 2], "choices", name, {
        "func": wrapped,
        "kwargs": kwargs
    })

@_parametrized
def section(fn, name, **kwargs):
    def wrapped(obj, **kwargs):
        return fn(obj, **kwargs)

    logging.debug(f"Registering section field: {name} {fn}")
    qn = fn.__qualname__.split(".")
    _store_field(qn[len(qn) - 2], "sections", name, {
        "func": wrapped,
        "kwargs": kwargs
    })


@_parametrized
def image(fn, name, **kwargs):
    """
    Image block
    :param name: Image block name
    :param kwargs: Options
    """

    def wrapped(obj, **kwargs):
        # todo: image
        image_data = fn(obj)
        # todo: encode base64
        return base64.b64encode(image_data).decode('iso-8859-1')

    logging.debug(f"Registering image field: {name} {fn}")
    qn = fn.__qualname__.split(".")
    _store_field(qn[len(qn) - 2], "images", name, {
        "func": wrapped,
        "kwargs": kwargs
    })

@_parametrized
def PDFEntry(cls, template, **kwargs):
    """
    Class decorator with template binding
    :param template: Verge template ID
    """
    logging.debug(f"Registering PDF-class {cls} -> template {template}")
    logging.debug(kwargs)

    def pdfentry(**kwargs):
        return cls(**kwargs)

    templates[cls.__name__] = template
    return pdfentry


def get_field_payload(obj, name, fields):
    fn = fields.get(name).get("func")
    kwargs = fields.get(name).get("kwargs")
    return fn(obj, **kwargs)


def get_section_payload(obj, name, sections):
    section_resolver = sections[name].get("func")
    kwargs = sections.get(name).get("kwargs")
    section_data = section_resolver(obj, **kwargs)
    package = []
    for section_obj in section_data:
        pl = get_payload(section_obj)
        data = pl["data"]
        print(type(data))
        templateId = pl["templateID"]
        package.append(data)
    return {
        "templateID": templateId,
        "data": package
    }

def get_payload(obj):
    cls = obj.__class__.__name__

    # Extract descriptor for class
    if not cls in forms_data:
        raise Exception(f"Class {cls} is not registered as PDFEntity")

    descriptor = forms_data[cls]

    # String fields descriptions
    logging.debug(f"Rendering class {cls}")

    data = {}

    if "strings" in descriptor.keys():
        string_fields = descriptor["strings"]
        for field in string_fields.keys():
            data[field] = get_field_payload(obj, field, string_fields)

    if "tables" in descriptor.keys():
        table_fields = descriptor["tables"]
        for table in table_fields.keys():
            data[f"table-{table}"] = get_field_payload(obj, table, table_fields)

    if "sections" in descriptor.keys():
        section_fields = descriptor["sections"]
        for section in section_fields.keys():
            data[f"section-{section}"] = get_section_payload(obj, section, section_fields)

    if "incuts" in descriptor.keys():
        incut_fields = descriptor["incuts"]
        for incut in incut_fields.keys():
            data[f"#{incut}"] = get_field_payload(obj, incut, incut_fields)
    if "images" in descriptor.keys():
        image_fields = descriptor["images"]
        for image in image_fields.keys():
            data[f"@{image}"] = get_field_payload(obj, image, image_fields)

    import pprint
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(data)

    payload = {
        "templateID": templates[cls],
        "data": data
    }

    return payload


async def render(data_object):
    """
    Render PDF document, based on data_object
    
    :param data_object: Data object (decorated with PDFEntity) 
    """

    payload = get_payload(data_object)
    payload["data"] = json.dumps(payload["data"])

    async with aiohttp.ClientSession() as session:
        async with session.post("http://10.0.36.10:15080/verge/Writer", data=payload) as connection:
            pdf = await connection.read()
            return pdf

    return None


def sync_render(data_object):
    payload = get_payload(data_object)
    payload["data"] = json.dumps(payload["data"])

    logging.debug(f"Start render: {datetime.today().strftime('%d.%m.%Y %H:%M:%S')}")
    r = requests.post("http://10.0.36.10:15080/verge/Writer", data=payload)
    logging.debug(f"Finish render: {datetime.today().strftime('%d.%m.%Y %H:%M:%S')}")
    return r.content
