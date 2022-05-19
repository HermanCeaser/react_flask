import os
import sys

from app.api import report_failure, report_success
from dotenv import load_dotenv

from public_ip import get_public_ip

try:
    basedir = os.path.abspath(os.path.dirname(__file__))
except NameError:
    basedir = os.path.abspath(os.path.dirname("."))

sys.path.insert(0, basedir)

dotenv_path = os.path.join(os.path.dirname(__file__), ".env.dev")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "hard to guess string"
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SSL_REDIRECT = False
    WTF_CSRF_ENABLED = True
    # Reference: https://python-rq.org/docs
    AZURE_REDIS_HOST = os.environ.get("AZURE_REDIS_HOST")
    AZURE_REDIS_PASSWORD = os.environ.get("AZURE_REDIS_PASSWORD")
    AZURE_REDIS_PORT = os.environ.get("AZURE_REDIS_PORT", 6379)
    API_PORT = int(os.environ.get("API_PORT", 3000))
    PUBLIC_IP, IS_PORT_OPEN = get_public_ip(API_PORT)
    # Webhook endpoint to send automatic response after job success or failure
    WEBHOOK_ENDPOINT = os.environ.get("WEBHOOK_ENDPOINT")
    print("WEBHOOK_ENDPOINT", WEBHOOK_ENDPOINT)
    if IS_PORT_OPEN and not WEBHOOK_ENDPOINT:
        WEBHOOK_ENDPOINT = "{}/webhook".format(PUBLIC_IP)
    print("WEBHOOK_ENDPOINT", WEBHOOK_ENDPOINT)
    print("API_PORT", API_PORT)
    print("PUBLIC_IP", PUBLIC_IP)
    print("IS_PORT_OPEN", IS_PORT_OPEN)

    QUEUES = ["default"]
    # job_timeout specifies the maximum runtime of the job before it’s \
    # interrupted and marked as failed. Its default unit is second and it can \
    # be an integer or a string representing an integer(e.g. 2, '2'). \
    # Furthermore, it can be a string with specify unit including hour, \
    # minute, second(e.g. '1h', '3m', '5s').
    JOB_TIMEOUT = "1h"
    # result_ttl specifies how long (in seconds) successful jobs and their \
    # results are kept. Expired jobs will be automatically deleted.
    # Defaults to 500 seconds.
    JOB_RESULT_TTL = 3600 * 12
    # ttl specifies the maximum queued time (in seconds) of the job before \
    # it’s discarded. This argument defaults to None (infinite TTL).
    JOB_TTL = None
    # failure_ttl specifies how long failed jobs are kept (defaults to 1 year)
    JOB_FAILURE_TTL = "300s"
    # depends_on specifies another job (or list of jobs) that must complete \
    # before this job will be queued.
    DEPENDS_ON = None
    # job_id allows you to manually specify this job’s job_id
    JOB_ID = None
    # at_front will place the job at the front of the queue, instead of the back
    JOB_AT_FRONT = False
    # description to add additional description to enqueued jobs.
    JOB_DESCRIPTION = "This job is handled independently by seperate web worker"
    # on_success allows you to run a function after a job completes successfully
    JOB_ON_SUCCESS = report_success
    # on_failure allows you to run a function after a job fails
    JOB_ON_FAILURE = report_failure
    # You can also enqueue multiple jobs in bulk with queue.enqueue_many()
    # and Queue.prepare_data() which will enqueue all the jobs in a single
    # redis pipeline which you can optionally pass in yourself
    JOB_PIPELINE = None
    # Refer https://python-rq.org/docs/ and
    # https://github.com/rq/rq/blob/master/rq/queue.py
    JOB_META = None
    JOB_RETRY = None
    DEBUG = False
    TESTING = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "SQLALCHEMY_DATABASE_URI"
    ) or "sqlite:///" + os.path.join(basedir, "data-dev.sqlite")

    @classmethod
    def init_app(cls, app):
        Config.init_app(app)

        # log to stderr
        import logging

        # Create formatters and add it to handlers
        log_format = "%(levelname)s - [%(filename)s] - %(asctime)s - %(process)d -  %(lineno)d - %(message)s "
        f_format = logging.Formatter(log_format, datefmt="%d-%b-%y %H:%M:%S")
        # Create handlers
        f_handler = logging.FileHandler("dev-error.log")
        f_handler.setLevel(logging.ERROR)
        f_handler.setFormatter(f_format)
        # Add handlers to the logger
        app.logger.addHandler(f_handler)


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI") or "sqlite://"
    WTF_CSRF_ENABLED = False

    @classmethod
    def init_app(cls, app):
        Config.init_app(app)

        # log to stderr
        import logging

        # Create formatters and add it to handlers
        log_format = "%(levelname)s - [%(filename)s] - %(asctime)s - %(process)d -  %(lineno)d - %(message)s "
        f_format = logging.Formatter(log_format, datefmt="%d-%b-%y %H:%M:%S")
        # Create handlers
        f_handler = logging.FileHandler("test-error.log")
        f_handler.setLevel(logging.ERROR)
        f_handler.setFormatter(f_format)
        # Add handlers to the logger
        app.logger.addHandler(f_handler)


class ProductionConfig(Config):
    SSL_REDIRECT = True if os.environ.get("HTTPS_REDIRECT") else False

    @classmethod
    def init_app(cls, app):
        Config.init_app(app)

        # handle reverse proxy server headers
        # https://github.com/Azure-Samples/ms-identity-python-webapp/issues/16#issuecomment-586164031
        from werkzeug.middleware.proxy_fix import ProxyFix

        app.wsgi_app = ProxyFix(app.wsgi_app)

        # log to stderr
        import logging
        from logging import StreamHandler

        file_handler = StreamHandler()
        log_format = "%(levelname)s - [%(filename)s] - %(asctime)s - %(process)d -  %(lineno)d - %(message)s "
        log_formatter = logging.Formatter(log_format, datefmt="%d-%b-%y %H:%M:%S")
        file_handler.setFormatter(log_formatter)
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": ProductionConfig,
}
