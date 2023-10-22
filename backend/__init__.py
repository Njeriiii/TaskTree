import os
from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager


# Initialize SQLAlchemy for later use in your models
db = SQLAlchemy()

# Initialize the login manager
login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configure your app
    app.config["SECRET_KEY"] = "your_secret_key"  # Replace with your secret key
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"

    # Initialize SQLAlchemy with your app
    db.init_app(app)

    login_manager.init_app(app)  # Initialize the login manager with your Flask app

    with app.app_context():
        # Create your database tables
        db.create_all()

    # Import your models
    from . import models

    # Import your blueprints (main and auth)
    from .main import main as main_blueprint
    from .auth import auth as auth_blueprint

    # Register your blueprints
    app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint)

    # login_manager.login_view = "auth.login"  # Set the login view (the login route)
    login_manager.init_app(app)  # Initialize the login manager with your Flask app

    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=5162)

    return app
