# project/tests/test_main.py


import unittest

from base import BaseTestCase


class TestMainBlueprint(BaseTestCase):
    def test_users_api_is_up(self):
        # Ensure Flask is setup.
        response = self.client.get("/api/v1/users/check", follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_data(as_text=True), "User API is up")

    def test_auth_api_is_up(self):
        # Ensure Flask is setup.
        response = self.client.get("/api/v1//auth/check", follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_data(as_text=True), "Auth API is up")

    def test_delay_api_is_up(self):
        # Ensure Flask is setup.
        response = self.client.get("/api/v1/delay/check", follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_data(as_text=True), "Delay API is up")


if __name__ == "__main__":
    unittest.main()
