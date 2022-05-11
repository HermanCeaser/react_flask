# project/tests/test__config.py


import unittest

from app import create_app, db
from flask import current_app

app = create_app()


class TestDevelopmentConfig(unittest.TestCase):
    def setUp(self):
        self.app = create_app("development")
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_app_is_development(self):
        self.assertFalse(current_app is None)
        self.assertFalse(current_app.config["TESTING"])
        self.assertFalse(self.app.config["TESTING"])
        self.assertTrue(self.app.config["DEBUG"] is True)
        self.assertTrue(self.app.config["WTF_CSRF_ENABLED"] is True)


class TestTestingConfig(unittest.TestCase):
    def setUp(self):
        self.app = create_app("testing")
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_app_is_testing(self):
        self.assertFalse(current_app is None)
        self.assertTrue(current_app.config["TESTING"])
        self.assertTrue(self.app.config["TESTING"])
        self.assertTrue(self.app.config["DEBUG"] is False)
        self.assertTrue(self.app.config["WTF_CSRF_ENABLED"] is False)


if __name__ == "__main__":
    unittest.main()
