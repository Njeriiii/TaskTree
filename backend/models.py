from backend import db, login_manager
from flask_login import UserMixin, LoginManager
from flask_sqlalchemy import SQLAlchemy


class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True)
    task_description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default="new")

    parent_id = db.Column(
        db.Integer, db.ForeignKey("task.task_id"), default=None
    )  # Self-referencing foreign key
    user_id = db.Column(
        db.Integer, db.ForeignKey("user.user_id"), nullable=False
    )  # Add foreign key to link Task to User

    user = db.relationship("User", back_populates="tasks")
    parent = db.relationship("Task", remote_side=[task_id])  # each subtask has a parent

    # def __init__(self, task_description, status="new", parent_id=0):
    #     self.task_description = task_description
    #     self.status = status
    #     self.parent_id = parent_id

    def to_dict(self):
        return {
            "task_id": self.task_id,
            "task_description": self.task_description,
            "status": self.status,
            "parent_id": self.parent_id,
        }

    def __repr__(self):
        return f"Task('{self.task_description}')"


class User(db.Model, UserMixin):
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    tasks = db.relationship("Task", back_populates="user")

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
        }

    def __repr__(self):
        return f"User('{self.first_name}', '{self.email}')"

    def get_id(self):
        return str(self.user_id)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(str(user_id))
