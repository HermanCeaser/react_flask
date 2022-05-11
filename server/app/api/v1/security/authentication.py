from flask import jsonify
from flask_httpauth import HTTPBasicAuth, g

from .. import api

__all__ = ["auth"]

auth = HTTPBasicAuth()


@api.route("/auth/check", methods=["GET"])
def check_auth_api():
    return "Auth API is up"


@api.route("/auth/resource")
@auth.login_required
def get_resource():
    return jsonify({"data": "Hello, %s!" % g.user.username})
