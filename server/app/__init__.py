import os

# Import config module
import pathlib

from flask import Flask
from flask_login import LoginManager

try:
    basedir = pathlib.os.path.abspath(pathlib.os.path.dirname(__file__))
except NameError:
    basedir = pathlib.os.path.abspath(pathlib.os.path.dirname("."))
try:
    from config import config
except ModuleNotFoundError:
    serverdir = pathlib.os.path.dirname(basedir)
    pathlib.sys.path.insert(0, serverdir)
    from config import config

from .api import *
from .database import *

# Here database.commonfile.commonfile_function() will be
# overridden by api.v1.delay.commonfile.commonfile_function() due
# to above api.* import statement

__all__ = database.__all__ + api.__all__

# Flask-Login is initialized in the application factory function.
login_manager = LoginManager()
"""
The login_view attribute of the LoginManager object sets the endpoint
for the login page. Flask-Login will redirect to the login page when
an anonymous user tries to access a protected page. Because the login
route is inside a blueprint, it needs to be prefixed with the blueprint
name.
"""
login_manager.login_view = "auth.login"


def create_app(config_name=None):
    app = Flask(__name__, static_folder="../../build", static_url_path="/")
    if config_name is None:
        config_name = os.getenv("FLASK_CONFIG") or "default"
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)

    login_manager.init_app(app)

    if app.config["SSL_REDIRECT"]:
        from flask_sslify import SSLify

        sslify = SSLify(app)

    from .api.v1 import api as api_blueprint

    app.register_blueprint(api_blueprint, url_prefix="/api/v1")

    # attach routes and custom error pages here

    return app
