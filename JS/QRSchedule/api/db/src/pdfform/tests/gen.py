from datetime import date

from pdfform import model
import logging
logging.basicConfig(level=logging.DEBUG)

@model.PDFEntry(template="blank2")
class Blank:

    @model.text(name="NUM")
    def get_num(self):
        return "15"

    @model.text(name="DATE")
    def get_date(self):
        return date.today().strftime("%d.%m.%Y")

    @model.table(name="RESULTS")
    def get_results(self):
        return [
            {
                "%": "1",
                "$": "*",
                "TITLE": "Студенты"
            },
            {
                "FIO": "Иванов И.И.",
                "SCORE": 55
            },
            {
                "FIO": "Петров И.И.",
                "SCORE": 100
            },
            {
                "%": "1",
                "$": "*",
                "TITLE": "Школьники"
            },

        ]

    @model.section(name="HELLOERS")
    def get_helloers(self):
        return [
            Hello(name='Ivan'),
            Hello(name='Maria'),
            Hello(name='Arina')
        ]

@model.PDFEntry(template="hello")
class Hello:

    name:str = None

    def __init__(self, name):
        self.name = name

    @model.text(name="NAME")
    def get_name(self):
        return self.name

blank = Blank()
pdf = model.sync_render(blank)
with open("gen.pdf","wb") as pdffile:
    pdffile.write(pdf)
