import requests
from flask import jsonify, request

from .. import api
from .env import endpoint, iteration_id, project_id, training_key, version

__all__ = []


@api.route("/quicktest/check", methods=["GET"])
def check_quicktest_api():
    return "quicktest API is up"


@api.route("/quicktest/", methods=["POST"])
def quick_test():
    files_dict = dict(request.files.to_dict(flat=True))
    p = "/training/projects/"
    url = f"{endpoint}/customvision/{version}{p}{project_id}/quicktest/image?iterationId={iteration_id}"
    payload = {}
    files = []
    for key, value in files_dict.items():
        pairs = (key, value)
        files.append(pairs)
    headers = {
        "Accept": "application/octet-stream",
        "Training-Key": training_key,
    }
    response = requests.request("POST", url, headers=headers, data=payload, files=files)
    data = response.json()
    return jsonify(data)


@api.route("/tag/", methods=["POST"])
def tag_image():
    tag_id = "2eae19e8-fad6-4578-93bf-dafc7d5e348a"
    image_id = "294753d4-53e3-479e-b25f-700cb61962bb"
    one = '{\r\n  "tags": [\r\n    {\r\n      "imageId": "' + image_id
    two = '",\r\n      "tagId": "' + tag_id
    three = '",\r\n    }\r\n  ]\r\n}'
    payload1 = one + two + three
    url = (
        f"{endpoint}/customvision/{version}/training/projects/{project_id}/images/tags"
    )
    payload = payload1
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "Training-Key": training_key,
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    data = response.json()
    return jsonify(data)
