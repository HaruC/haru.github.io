from distutils.core import setup

setup(
    name='pdfform',
    version='1.0',
    packages=['pdfform'],
    url='',
    license='GPLv3',
    author='Dmitrii Zolotov',
    author_email='dzolotov@herzen.spb.ru',
    description='Verge Form Mapping', requires=['requests', 'aiohttp']
)
