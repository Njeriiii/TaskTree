from flask import Blueprint, request, jsonify, session, url_for, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required
from backend import db, login_manager
from .models import User
from flask_login import login_required, logout_user, current_user, login_user
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.urls import url_parse

auth = Blueprint("auth", __name__)

# auth.py
#  Requiring Users To Login
# Flask-Login provides a very useful feature that forces users to log in
# before they can view certain pages of the application.
# If a user who is not logged in tries to view a protected page,
# Flask-Login will automatically redirect the user to the login form,
# and only redirect back to the page the user wanted to view after the login process is complete
# login_manager.login_view = "auth.login"  # Set the login view (the login route)


@auth.route("/backend/register", methods=["POST"])
def register():
    data = request.get_json()
    password = data.get("password")
    email = data.get("email")
    first_name = data.get("first_name")
    last_name = data.get("last_name")

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password, method="sha256")
    new_user = User(
        password=hashed_password,
        email=email,
        first_name=first_name,
        last_name=last_name,
    )

    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.user_id
    return (
        jsonify(
            {
                "message": "User registered successfully",
                "user_id": new_user.user_id,
                "email": new_user.email,
            }
        ),
        201,
    )


@auth.route("/backend/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    print(user)

    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401

    next_page = request.args.get("next")
    if not next_page or url_parse(next_page).netloc != "":
        next_page = url_for("/")
    print(next_page)

    login_user(user)
    session["user_id"] = user.user_id

    # return (
    #     jsonify(
    #         {
    #             "message": "User logged in successfully",
    #             "user_id": user.user_id,
    #             "email": user.email,
    #         }
    #     ),
    #     200,
    # )
    # Redirect to the target page
    return redirect(next_page)


@auth.route("/backend/logout", methods=["GET"])
@login_required
def logout():
    session.pop("user_id", None)
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200


@auth.route("/backend/current_user")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(user_id=user_id).first()
    return jsonify(
        {
            "message": "User found successfully",
            "id": user.user_id,
            "email": user.email,
            "first_name": user.first_name,
        }
    )


@auth.route("/backend/check_authentication", methods=["GET"])
def check_authentication():
    user_id = session.get("user_id")
    print(user_id)

    if user_id is None:
        return jsonify({"message": "User is not authenticated"}), 401

    # jsonify({"message": "Logged out successfully"}), 200

    user = User.query.get(user_id)

    if user:
        user_data = {
            "id": user.user_id,
            "email": user.email,
            "first_name": user.first_name,
        }
        return jsonify({"message": "User is authenticated"}), 200

    else:
        return jsonify({"message": "User is not authenticated"}), 401
