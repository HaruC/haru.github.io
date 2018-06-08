import os
import json
import csv
import cairosvg
import pyqrcode
from PIL import Image
from uuid import uuid4
from schema import schema
from flask.json import jsonify
from database import db_session
from collections import namedtuple
from flask_graphql import GraphQLView
from flask import Flask, request, send_from_directory, Response, abort

from src.pdfform.pdfform import model

ROOT = "/data"

app = Flask(__name__)
app.debug = True


app.add_url_rule(
    '/graphql',
     view_func=GraphQLView.as_view(
         'graphql',
         schema=schema,
         graphiql=True
     )
)


@model.PDFEntry(template="qr-template")
class Qr:
    def __init__(self, name):
        self.filename = name

    @model.image(name="QR")
    def render_qr(self):

        return open(os.path.join('./', self.filename), 'rb').read()


def generate_qr(string, uuid):
    print("Generate QR in")

    # Directory exists?
    path = ROOT + "/codes/"
    if not os.path.isdir(path):
       os.makedirs(path)

    # Removing initial id
    initial = string.split('/')
    rid_of = "/".join(initial[:len(initial)-1])

    # Creating qr code
    url = pyqrcode.create(rid_of + '/' + uuid)
    url.svg(path + uuid + ".svg", scale=8)

    # Add logo above
    conf = {
        'width': 1262,
        'height': 1262
    }

    cairosvg.svg2png(
        url=path + uuid +".svg",
        write_to=path + "qr.png",
        parent_width=conf['width'],
        parent_height=conf['height'],
        scale=2.8
    )

    img = Image.open(path + 'qr.png')
    logo = Image.open('./static/QRlogo.png')

    img.paste(logo, (0, 0), logo)
    img = img.crop((0, 0, conf['width'], conf['height']))
    img.save(path + uuid + '.png')

    # Create pdf version
    qr = Qr(name=path+ uuid + '.png')
    pdf = model.sync_render(qr)
    with open(path + uuid + '.pdf', 'wb') as f:
        f.write(pdf)

    # Clean after all
    os.remove(path + "qr.png")
    os.remove(path + uuid + ".png")
    os.remove(path + uuid + ".svg")

    print("Generate QR done")


@app.route('/uuid', methods=["POST", "GET"])
def get_uuid():
    global res
    col = namedtuple('UUID', ["id", "uuid"])

    # Check if file exists
    if not os.path.isfile(ROOT+"/uuid.csv"):
        with open(ROOT + '/uuid.csv', 'w') as file:
            print("File doesn't exists")
            file.write("id,uuid\n")

    if request.method == "POST":
        print(" Enter POST request")
        UUID = uuid4()
        duplication = False
        data = request.get_json()
        lofi = data["id"] + ',' + str(UUID)

        # Find any duplicates
        for item in map(col._make, csv.reader((open( ROOT + '/uuid.csv', "r")))):
            if item.id == data["id"]:
                duplication = True
                data["uuid"] = item.uuid

        # If duplicate exists return record
        # else create one
        print("     Before reading csv in POST")
        with open( ROOT + '/uuid.csv', 'a') as csv_file:
            if duplication:
                res = json.dumps({data["id"]: data["uuid"]}, indent=4)
            else:
                writter = csv.writer(csv_file, delimiter=',')
                writter.writerow(lofi.split(','))
                res = json.dumps({data["id"]: str(UUID)}, indent=4)
                generate_qr(request.referrer, str(UUID))
        print("     After reading csv in POST")
    if request.method == "GET":
        print(" Enter GET request")
        with open( ROOT + "/uuid.csv", "r") as file:
            print("     Before reading csv")
            reader = csv.DictReader(file)
            print("     After reading csv", file)
            res = jsonify(json.loads(json.dumps([i for i in reader])))
            print("     Complete with json dump")
    return res


@app.route('/code/<uuid>', methods=["GET"])
def get_code(uuid):
    return send_from_directory(os.path.abspath(ROOT + "/codes"), uuid, mimetype="application/pdf")


@app.route('/metrics', methods=["GET"])
def get_metrics():
    with open(ROOT + '/uuid.csv', 'r') as uuids:
        uuids_count = sum(1 for line in uuids)-1        # without header
        metrics = {}
        metrics["app_qrcode_issued"]=uuids_count
        metrics_str = "\n".join(f"{name} {value}" for name,value in metrics.items())
        return Response(metrics_str, mimetype='text/plain')
    abort(404)


def add_cors_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Origin'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    return response


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


app.after_request(add_cors_header)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
