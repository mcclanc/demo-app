from flask import Flask, jsonify, request
from flask_cors import CORS
from caspyr import Session, Deployment, Project, User, Blueprint, CloudAccount
import requests
import json

app = Flask(__name__)
app.secret_key = "super secret key"
CORS(app)

@app.route("/api/cas", methods=["POST"])
def get_data():
    print("begin")
    req = request.get_json()
    token = req['cspapitoken']
    s = Session.login(token)
    serialData = {}
    deployments = len(Deployment.list(s))
    bps = len(Blueprint.list(s))
    projects = len(Project.list(s))
    cloudaccounts = len(CloudAccount.list(s))
    serialData['deployments'] = deployments
    serialData['bps'] = bps
    serialData['projects'] = projects
    serialData['cloudaccounts'] = cloudaccounts
    print(serialData)
    return jsonify(serialData)


if __name__ == "__main__":
    app.run(debug=True)