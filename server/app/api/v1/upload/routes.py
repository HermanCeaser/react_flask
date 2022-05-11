import requests
from flask import jsonify, request

from .. import api
from .env import endpoint, iteration_id, project_id, training_key, version

__all__ = []


@api.route("/upload/check", methods=["GET"])
def check_upload_api():
    return "Upload API is up"


@api.route("/upload/single", methods=["POST"])
def upload_single_image():
    files_dict = dict(request.files.to_dict(flat=True))
    url_1 = (
        f"{endpoint}/customvision/v3.4-preview/training/projects/{project_id}/images"
    )
    payload_1 = {}
    files = []
    for key, value in files_dict.items():
        pairs = (key, value)
        files.append(pairs)
    headers_1 = {
        "Accept": "application/octet-stream",
        "Training-Key": training_key,
    }
    response_1 = requests.request(
        "POST", url_1, headers=headers_1, data=payload_1, files=files
    )
    data_1 = response_1.json()
    image_id_data = []
    for i in range(len(data_1["images"])):
        image_id = data_1["images"][i]["image"]["id"]
        image_id_data.append(image_id)
    one = f"{endpoint}/customvision/{version}/training/projects/{project_id}/tagsandregions/"
    two = f"suggestions?+iterationId={iteration_id}&imageIds="
    three = ",".join(image_id_data)
    url_2 = one + two + three
    payload_2 = {}
    headers_2 = {"Accept": "application/json", "Training-Key": training_key}
    response_2 = requests.request("POST", url_2, headers=headers_2, data=payload_2)
    data_2 = response_2.json()
    final = {"prediction": data_2, "upload": data_1}
    return jsonify(final)
