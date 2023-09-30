import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask import request, Response

# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["SECRET_KEY"] = "secret-key-goes-here"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"

    db.init_app(app)

    from . import models

    with app.app_context():
        db.create_all()

    from .main import main as main_blueprint

    CORS(main_blueprint)
    app.register_blueprint(main_blueprint)

    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=5162)

    return app
