from . import db
from sqlalchemy import Text


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default="new")
    # parent_id = db.Column(db.Integer, default=0)  # Default parent_id to 0
    # null as parent_id

    parent_id = db.Column(
        db.Integer, db.ForeignKey("task.id"), default=None
    )  # Self-referencing foreign key

    # parent = db.relationship('Task', remote_side=[id], backref='children')
    # don't delete -- mark as a 'completed' or make invisivle
    # can allow for 'undo' functionality
    #

    def __init__(self, task_description, status="new", parent_id=0):
        self.task_description = task_description
        self.status = status
        self.parent_id = parent_id

    def to_dict(self):
        return {
            "id": self.id,
            "task_description": self.task_description,
            "status": self.status,
            "parent_id": self.parent_id,
        }

    def __repr__(self):
        return f"Task('{self.task_description}')"
