from bs4 import BeautifulSoup
import os
from pyparsing import stringStart
import requests
import json
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
PASSWORT = os.getenv('PASSWORT')


def getkader(id, mannschaften):

    mongourl = "mongodb+srv://kreisligaadmin:{}@cluster0.no87u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority".format(
        PASSWORT)

    client = MongoClient(mongourl)

    db = client["KickbaseAllstars"]

    collection = db["Spieler"]

    url = "https://www.fupa.net/fupa/widget/fupa_widget.php?type=team_widget&type_values%5B%5D=kader&value={}&selected_tab=1".format(
        id)

    url_position = "https://www.fupa.net/team/{}".format(mannschaften)
    r = requests.get(url)

    r_pos = requests.get(url_position)

    doc = BeautifulSoup(r.text, "lxml")
    doc2 = BeautifulSoup(r.text, "lxml")

    doc_pos = BeautifulSoup(r_pos.text, "lxml")

    torwart = 0
    abwehr = 0
    mittelfeld = 0
    sturm = 0

    summe_spieler = 0

    for team in doc_pos.find_all(class_="sc-1e04cm7-1 dPiPBR"):
        num_torwart = team.find_all(class_="sc-1aydu1u-0")[0]
        for na in num_torwart.findAll(class_="sc-1mrugnb-8 BpYA-d"):
            torwart = torwart + 1
        num_abwehr = team.find_all(class_="sc-1aydu1u-0")[1]
        for na in num_abwehr.findAll(class_="sc-1mrugnb-8 BpYA-d"):
            abwehr = abwehr + 1
        num_mittelfeld = team.find_all(class_="sc-1aydu1u-0")[2]
        for na in num_mittelfeld.findAll(class_="sc-1mrugnb-8 BpYA-d"):
            mittelfeld = mittelfeld + 1
        num_sturm = team.find_all(class_="sc-1aydu1u-0")[3]
        for na in num_sturm.findAll(class_="sc-1mrugnb-8 BpYA-d"):
            sturm = sturm + 1

    summe_spieler = torwart+abwehr+mittelfeld+sturm

    result = []
    alter = []
    games = []
    goals = []
    assists = []
    gelb = []
    gelbrot = []
    rot = []

    stats = []
    images = []

    for results in doc2.find_all("picture"):
        for data in results.find_all("img"):
            images.append(data["src"])

    for results in doc2.find_all("tr"):
        for data in results.find_all("td"):
            stats.append(data.text)

    for i in range(len(stats)):
        if stats[i] == '-':
            stats[i] = "0"
        elif stats[i] == "\n\n\n-":
            stats[i] = "0"

    games.append(stats[::6])
    goals.append(stats[1::6])
    assists.append(stats[2::6])
    gelb.append(stats[3::6])
    gelbrot.append(stats[4::6])
    rot.append(stats[5::6])

    def maybeMakeNumber(s):
        # handle None, "", 0
        if not s:
            return s
        try:
            f = float(s)
            i = int(f)
            return i if f == i else f
        except ValueError:
            return s

    converted_games = list(map(maybeMakeNumber, games[0]))
    converted_goals = list(map(maybeMakeNumber, goals[0]))
    converted_assists = list(map(maybeMakeNumber, assists[0]))
    converted_gelb = list(map(maybeMakeNumber, gelb[0]))
    converted_gelbrot = list(map(maybeMakeNumber, gelbrot[0]))
    converted_rot = list(map(maybeMakeNumber, rot[0]))

    for players in doc.find_all(class_="fupa_table_entry_info"):
        try:
            alter.append(players.find_all("span")[1].string)
        except:
            alter.append("None")

        result.append(players.find("div").text)

    anzahl_betreuer = len(result) - summe_spieler
    new_result = result[anzahl_betreuer:]
    new_alter = alter[anzahl_betreuer:]
    new_image = images[anzahl_betreuer:]
    mannschaft = []

    for i, results in enumerate(new_result):
        position = ""
        spiele_punkte = 10
        tore_punkte = 0
        assists_punkte = 0
        rot_punkte = 0
        gelb_punkte = 0
        gelbrot_punkte = 0

        if i < (summe_spieler - sturm - mittelfeld - abwehr):
            position = "Torwart"
            tore_punkte = 50
            assists_punkte = 25
            rot_punkte = -20
            gelb_punkte = -5
            gelbrot_punkte = -10
        elif i < (summe_spieler - sturm - mittelfeld):
            position = "Abwehr"
            tore_punkte = 10
            assists_punkte = 8
            rot_punkte = -20
            gelb_punkte = -5
            gelbrot_punkte = -20
        elif i < (summe_spieler - sturm):
            position = "Mittelfeld"
            tore_punkte = 7
            assists_punkte = 6
            rot_punkte = -30
            gelb_punkte = -5
            gelbrot_punkte = -15
        else:
            position = "Sturm"
            tore_punkte = 5
            assists_punkte = 5
            rot_punkte = -40
            gelb_punkte = -5
            gelbrot_punkte = -15

        punkte = (converted_games[i])*spiele_punkte + (converted_goals[i])*tore_punkte + (converted_assists[i])*assists_punkte + (
            converted_gelb[i])*gelb_punkte + (converted_gelbrot[i])*gelbrot_punkte + (converted_rot[i])*rot_punkte

        new_mannschaft = mannschaften.replace("-", " ").split()

        verein = ""

        if id != "990260":
            verein = new_mannschaft[:2]
        else:
            verein = new_mannschaft[:3]

        vereinsname = " ".join([str(item).capitalize() for item in verein])

        player = {
            "_id": results.split()[1]+results.split()[0]+id+position,
            "firstname": results.split()[1],
            "lastname": results.split()[0],
            "alter": new_alter[i],
            "games": converted_games[i],
            "goals": converted_goals[i],
            "assists": converted_assists[i],
            "gelb": converted_gelb[i],
            "gelbrot": converted_gelbrot[i],
            "rot": converted_rot[i],
            "teamid": id,
            "image": new_image[i],
            "punkte": punkte,
            "mannschaft": vereinsname,
            "position": position
        }
        collection.update_one({
        "_id": results.split()[1]+results.split()[0]+id+position},
        {
            '$set': {
                "firstname": results.split()[1],
                "lastname": results.split()[0],
                "alter": new_alter[i],
                "games": converted_games[i],
                "goals": converted_goals[i],
                "assists": converted_assists[i],
                "gelb": converted_gelb[i],
                "gelbrot": converted_gelbrot[i],
                "rot": converted_rot[i],
                "teamid": id,
                "image": new_image[i],
                "punkte": punkte,
                "mannschaft": vereinsname,
                "position": position
            }
            }, True)
        mannschaft.append(player)

    print(mannschaft)
    return(mannschaft)
