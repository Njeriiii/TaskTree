from . import db
from sqlalchemy import Text


class Task(db.Model):
    id = db.Column(
        db.Integer, primary_key=True
    )  # primary keys are required by SQLAlchemy
    task_description = db.Column(Text, unique=False)
    status = db.Column(db.String(20), default="To Do")

    def __repr__(self):
        return f"Task('{self.task_description}')"
