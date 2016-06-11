from flask import Flask, request, jsonify
from flask.ext.cors import CORS
from tint import from_url, hex

application = Flask(__name__)
cors = CORS(application)

@application.route('/<path:url>')
def tint(url):
    colour = from_url(url, params=request.args)
    return jsonify(colour=hex(colour))
