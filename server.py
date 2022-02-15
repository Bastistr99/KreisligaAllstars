import os
from test import getkader
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from bson.json_util import dumps
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(
    "mongodb+srv://kreisligaadmin:{}@cluster0.no87u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").format(os.getenv('PASSWORT'))

db = client["KickbaseAllstars"]

collection = db["Spieler"]
collection_mannschaft = db["Mannschaft"]

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


ID_Beuren = ["990247", "sv-beuren-m1-2021-22"]
ID_Illerberg = ["990252", "ssv-illerbergthal-m1-2021-22"]
ID_FVSenden = ["990248", "fv-senden-m1-2021-22"]
ID_TürksporNU = ["990260", "tuerkspor-neu-ulm-m2-2021-22"]
ID_Altenstadt = ["990256", "fv-altenstadt-m1-2021-22"]
ID_Oberroth = ["990253", "sv-oberroth-m1-2021-22"]
ID_Weissenhorn = ["990262", "fv-weissenhorn-m1-2021-22"]
ID_Ay = ["990250", "fv-ay-m1-2021-22"]
ID_Kettershausen = ["990258", "tsv-kettershausen-bebenhausen-m1-2021-22"]
ID_Illerkirchberg = ["990261", "fc-illerkirchberg-m1-2021-22"]
ID_Dietenheim = ["990255", "tsv-dietenheim-m1-2021-22"]
ID_Gerlenhofen = ["990251", "fv-gerlenhofen-m1-2021-22"]
ID_Balzheim = ["990249", "sv-balzheim-m1-2021-22"]
ID_Au = ["990254", "spvgg-auiller-m1-2021-22"]
ID_TSVSenden = ["990259", "tsv-senden-m1-2021-22"]
ID_Jedesheim = ["990257", "sv-jedesheim-m1-2021-22"]

KreisligaA = [ID_Illerberg, ID_Altenstadt, ID_Au, ID_Balzheim, ID_Beuren, ID_Dietenheim, ID_FVSenden,
              ID_Gerlenhofen, ID_Jedesheim, ID_Kettershausen, ID_Oberroth, ID_TSVSenden, ID_Weissenhorn, ID_Ay]


@app.get("/")
@cross_origin()
def homepage():
    for teams in KreisligaA:
        getkader(teams[0], teams[1])
    return "<h1>Kader geladen</h1>"


@app.get("/players")
@cross_origin()
def get_players():
    players = []
    curser = collection.find({})
    for player in curser:
        players.append(player)
    return jsonify(players)


@app.get("/player/<id>")
@cross_origin()
def get_player(id):
    player = collection.find({"_id": id})
    json_player = list(player)
    return dumps(json_player)


@app.route("/mannschaft/<userid>", methods=["POST"])
@cross_origin()
def get_mannschaft(userid):
    data = request.get_json()

    player = {
        "_id": userid,
        "players": data["players"]
    }
    collection_mannschaft.update_one({
        "_id": userid},
        {
            '$set': {
                "players": player['players']
            }
            },True)

    return jsonify({"_id": userid, "players": data["players"]})
