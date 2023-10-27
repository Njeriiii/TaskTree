from backend import db, login_manager
from flask_login import UserMixin, LoginManager
from flask_sqlalchemy import SQLAlchemy


# Define the Board class to represent boards in the application
class Board(db.Model):
    # Define table columns
    board_id = db.Column(db.Integer, primary_key=True)
    board_title = db.Column(db.String(100), nullable=False)

    # Define the one-to-many relationship with Task
    tasks = db.relationship("Task", backref="associated_board", lazy=True)

    # Define the many-to-one relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
    user = db.relationship("User", backref="boards")

    # Method to convert Board to a dictionary
    def to_dict(self):
        return {
            "board_id": self.board_id,
            "board_title": self.board_title,
            "tasks": [task.to_dict() for task in self.tasks],
        }

    # Method to provide a string representation of the Board object
    def __repr__(self):
        return f"Board('{self.board_title}')"


# Define the Task class to represent tasks in the application
class Task(db.Model):
    # Define table columns
    task_id = db.Column(db.Integer, primary_key=True)
    task_description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default="new")

    # Define a foreign key relationship to the Board table to link tasks to boards
    board_id = db.Column(db.Integer, db.ForeignKey("board.board_id"), nullable=False)

    # Define a relationship to access the associated board using 'board' attribute
    board = db.relationship("Board", back_populates="tasks")

    # Define a self-referencing foreign key to establish parent-child task relationships
    parent_id = db.Column(db.Integer, db.ForeignKey("task.task_id"), default=None)

    # Define a foreign key relationship to the User table to link tasks to users
    user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)

    # Define a relationship to access the associated user using 'user' attribute
    user = db.relationship("User", back_populates="tasks")

    # Define a relationship to access the parent task using 'parent' attribute
    parent = db.relationship("Task", remote_side=[task_id])

    # Method to convert Task to a dictionary
    def to_dict(self):
        return {
            "task_id": self.task_id,
            "task_description": self.task_description,
            "status": self.status,
            "parent_id": self.parent_id,
        }

    # Method to provide a string representation of the Task object
    def __repr__(self):
        return f"Task('{self.task_description}')"


# Define the User class to represent users in the application
class User(db.Model, UserMixin):
    # Define table columns
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    tasks = db.relationship("Task", back_populates="user")

    # Method to convert User to a dictionary
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


# Flask-Login user loader function to load users by ID
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(str(user_id))
