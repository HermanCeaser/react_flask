from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
db.__all__ = ["db"]
