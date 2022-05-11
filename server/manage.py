#!/usr/bin/env python
import os

import click
import redis
from app import User, auth, create_app, db
from flask import jsonify, request, send_from_directory
from flask.cli import FlaskGroup
from flask_migrate import Migrate
from rq import Connection, Worker
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = create_app(os.getenv("FLASK_CONFIG") or "default")
# A Flask extension for handling Cross Origin Resource 
# Sharing (CORS), making cross-origin AJAX possible.
CORS(app)
migrate = Migrate(app, db)
cli = FlaskGroup(app)


@app.shell_context_processor
def make_shell_context():
    """
    The shell context processor function returns a dictionary that includes the database
    instance and the models. The flask shell command will import these items
    automatically into the shell, in addition to app, which is imported by default.
    """
    return dict(db=db, User=User)


# Source Code Profiling
@click.option(
    "--length",
    default=25,
    help="Number of functions to include in the profiler report.",
)
@click.option(
    "--profile-dir", default=None, help="Directory where profiler data files are saved."
)
def profile(length=25, profile_dir=None):
    """Start the application under the code profiler."""
    # https://github.com/Azure-Samples/ms-identity-python-webapp/issues/16#issuecomment-661638823
    from werkzeug.middleware.profiler import ProfilerMiddleware

    profile_dir and os.makedirs(profile_dir, exist_ok=True)
    app.wsgi_app = ProfilerMiddleware(
        app.wsgi_app,
        restrictions=[length],
        profile_dir=profile_dir,
        filename_format="{time:.0f}-{method}-{path}-{elapsed:.0f}ms.prof",
    )
    app.run(debug=False)


@app.route("/check", methods=["GET"])
def check_api():
    return "Application is up"


@app.route("/loadbalancing/check", methods=["GET"])
def check_loadbalancing_api():
    return "Application is up from port: {} present inside the container".format(
        os.environ.get("PORT")
    )


@app.route("/ping", methods=["GET"])
@auth.login_required
def ping_user():
    return jsonify({"output": "pong"})


@app.route("/static/<filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)


@app.route("/media/<filename>")
def mediafiles(filename):
    return send_from_directory(app.config["MEDIA_FOLDER"], filename)


@app.route("/upload", methods=["GET", "POST"])
def upload_file():
    if request.method == "POST":
        file = request.files["file"]
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["MEDIA_FOLDER"], filename))
    return """
    <!doctype html>
    <title>upload new File</title>
    <form action="" method=post enctype=multipart/form-data>
      <p><input type=file name=file><input type=submit value=Upload>
    </form>
    """


@cli.command()
@click.option(
    "--coverage/--no-coverage", default=False, help="Run tests under code coverage."
)
def test(coverage):
    """Runs the unit tests without test coverage."""
    cov = None
    if coverage:
        import coverage

        cov = coverage.coverage(branch=True, include="app/*")
        cov.start()

    import unittest

    tests = unittest.TestLoader().discover("tests", pattern="test*.py")
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if cov:
        cov.stop()
        cov.save()
        print("Coverage Summary:")
        cov.report()
        basedir = os.path.abspath(os.path.dirname(__file__))
        covdir = os.path.join(basedir, "coverage.report")
        print("covdir", covdir)
        cov.html_report(directory=covdir)
        print("HTML version: file://%s/index.html" % covdir)
        cov.erase()
    if result.wasSuccessful():
        return 0
    return 1


@cli.command("run_worker")
def run_worker():
    """Run application with redis workers"""
    redis_url = app.config["REDIS_URL"]
    redis_connection = redis.from_url(redis_url)
    with Connection(redis_connection):
        worker = Worker(app.config["QUEUES"])
        worker.work()


if __name__ == "__main__":
    import argparse
    import sys

    run_profile = None
    if len(sys.argv) > 2:
        run_profile = sys.argv and sys.argv[2] == "profile"
        if len(sys.argv) == 3 and run_profile:
            profile()
        elif run_profile:
            p = argparse.ArgumentParser()
            p.add_argument("--length")
            p.add_argument("--profile-dir")
            arguments = sys.argv
            args, extras = p.parse_known_args(arguments)
            profile(length=args.length, profile_dir=args.profile_dir)
        else:
            cli()
    else:
        cli()
