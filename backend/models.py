from . import db
from sqlalchemy import Text


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default="new")

    def __init__(self, task_description, status="new"):
        self.task_description = task_description
        self.status = status
        # self.sub_tasks = []  # Initialize sub_tasks as an empty list

    def __repr__(self):
        return f"Task('{self.task_description}')"

    sub_tasks = db.relationship("SubTask", backref="parent_task", lazy=True)


class SubTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default="new")
    parent_task_id = db.Column(db.Integer, db.ForeignKey("task.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "task_description": self.task_description,
            "status": self.status,
            "parent_task_id": self.parent_task_id,
        }

    def __repr__(self):
        return f"SubTask('{self.task_description}')"
