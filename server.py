from flask import Flask, request, jsonify
from tint import from_url, hex
application = Flask(__name__)

@application.route('/<path:url>')
def tint(url):
    colour = from_url(url, params=request.args)
    return jsonify(colour=hex(colour))
