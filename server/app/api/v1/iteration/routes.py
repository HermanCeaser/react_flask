import requests
from flask import jsonify

from .. import api
from .env import (
    endpoint,
    iteration_id,
    prediction_id,
    project_id,
    training_key,
    version,
)

__all__ = []


@api.route("/iteration/check", methods=["GET"])
def check_iteration_api():
    return "iteration API is up"


@api.route("/iteration/details", methods=["GET"])
def iteration_details():
    url = f"{endpoint}/customvision/{version}/training/projects/{project_id}/iterations"
    payload = {}
    headers = {"Accept": "application/json", "Training-Key": training_key}
    response = requests.request("GET", url, headers=headers, data=payload)
    data = response.json()
    return jsonify(data)


@api.route("/performance/details/", methods=["GET"])
def performance_details():
    one = f"{endpoint}/customvision/{version}/training/projects/{project_id}/"
    two = f"iterations/{iteration_id}/performance"
    url = one + two
    payload = {}
    headers = {"Accept": "application/json", "Training-Key": training_key}
    response = requests.request("GET", url, headers=headers, data=payload)
    data = response.json()
    return jsonify(data)


@api.route("/delete/iteration/", methods=["DELETE"])
def delete_iteration():
    print("WORKING")
    define_iteration_id = "define iteration id that you want to delete"
    one = (
        f"{endpoint}/customvision/{version}/training/projects/{project_id}+/iterations"
    )
    two = f"/{define_iteration_id}"
    url = one + two
    payload = {}
    headers = {"Accept": "*/*", "Training-Key": training_key}
    response = requests.request("DELETE", url, headers=headers, data=payload)
    data = response.json()
    return jsonify(data)


@api.route("/unpublish/iteration/", methods=["DELETE"])
def inpublish_iteration():
    print("WORKING")
    define_iteration_id = "define iteration id that you want to unpublish"
    one = f"{endpoint}/customvision/{version}/training/projects/{project_id}/iterations"
    two = f"/{define_iteration_id}/publish"
    url = one + two
    payload = {}
    headers = {"Accept": "*/*", "Training-Key": training_key}
    response = requests.request("DELETE", url, headers=headers, data=payload)
    data = response.json()
    return jsonify(data)


@api.route("/publish/iteration/", methods=["POST"])
def publish_iteration():
    print("WORKING")
    define_iteration_id = "define iteration id that you want to publish"
    publish_name = "define publish name that you want to publish"
    one = f"{endpoint}/customvision/{version}/training/projects/{project_id}/{define_iteration_id}/"
    two = f"publish?publishName={publish_name}&predictionId={prediction_id}&overwrite=true"
    url = one + two
    payload = {}
    headers = {
        "Accept": "application/json",
        "Training-Key": "b0b9174957b74adcafc2004d9cfb106d",
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    data = response.json()
    return jsonify(data)
