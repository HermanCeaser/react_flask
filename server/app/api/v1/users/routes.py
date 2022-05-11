from app.database import db
from flask import abort, g, jsonify, request, url_for

from .. import api
from ..security.authentication import auth
from .models import User

__all__ = []


@api.route("/users/check", methods=["GET"])
def check_user_api():
    return "User API is up"


@auth.verify_password
def verify_password(username_or_token, password):
    # If email_or_token field is blank, an anonymous user is assumed, as before
    if username_or_token == "":
        return False
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@api.route("/users", methods=["POST"])
def new_user():
    def create_new_user():
        username = request.json.get("username")
        password = request.json.get("password")
        email = request.json.get("email")
        if username is None or password is None:
            abort(400)  # missing arguments
        if User.query.filter_by(username=username).first() is not None:
            abort(400)  # existing user
        user = User(username=username, email=email)
        user.hash_password(password)
        db.session.add(user)
        db.session.commit()
        return (
            jsonify(
                {
                    "user_id": user.id,
                    "token": user.generate_auth_token(600).decode("ascii"),
                }
            ),
            201,
            {"Location": url_for("api.get_user", id=user.id, _external=True)},
        )

    try:
        return create_new_user()
    except Exception as e:
        if "sqlite3.OperationalError" in str(
            e
        ) or "pymysql.err.ProgrammingError" in str(e):
            "If database do not exist then create it"
            db.create_all()
            return create_new_user()
        else:
            return jsonify({"error": str(e)})


@api.route("/users/signin", methods=["POST"])
@auth.login_required
def get_user():
    username = request.json.get("username")
    user = User.query.filter_by(username=username).first()
    print(user)
    print(username)
    if not user:
        abort(400)
    return jsonify(
        {"user_id": user.id, "token": user.generate_auth_token(600).decode("ascii")}
    )


@api.route("/users/ping", methods=["GET"])
@auth.login_required
def ping_user():
    return jsonify({"output": "pong!!"})
