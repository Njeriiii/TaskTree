from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from backend import db, login_manager
from .models import User
from flask_login import login_required, logout_user, current_user, login_user

# Create a Blueprint for authentication-related routes
auth = Blueprint("auth", __name__)


@auth.route("/backend/register", methods=["POST"])
def register():
    """
    Register a new user.

    This route allows users to register with their email, first name, and last name.
    A new user record is created in the database, and the user's password is hashed before storing.

    Returns:
    - A JSON response indicating successful registration with user details.
    - In case of errors, an appropriate error message with a 400 status code.

    Args:
    - JSON data in the request:
    - password: User's password
    - email: User's email
    - first_name: User's first name
    - last_name: User's last name
    """
    # Parse JSON data from the request
    data = request.get_json()
    password = data.get("password")
    email = data.get("email")
    first_name = data.get("first_name")
    last_name = data.get("last_name")

    # Check if the user with the same email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    # Hash the user's password for security
    hashed_password = generate_password_hash(password, method="sha256")

    # Create a new user record
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
    """
    Log in a user.

    This route allows users to log in using their email and password.
    The route verifies the user's credentials and logs them in if they are correct.

    Returns:
    - A JSON response indicating successful login with user details.
    - In case of invalid credentials, an error message with a 401 status code.

    Args:
    - JSON data in the request:
    - email: User's email
    - password: User's password
    """
    # Parse JSON data from the request
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Find the user with the given email
    user = User.query.filter_by(email=email).first()

    # Check if the user exists and the password is correct
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401

    # Log in the user
    login_user(user)
    session["user_id"] = user.user_id

    return (
        jsonify(
            {
                "message": "User logged in successfully",
                "user_id": user.user_id,
                "email": user.email,
            }
        ),
        200,
    )


@auth.route("/backend/logout", methods=["GET"])
@login_required
def logout():
    """
    Log out a user.

    This route allows a logged-in user to log out, terminating their session.

    Returns:
    - A JSON response indicating successful logout with a 200 status code.

    Args:
    - None
    """
    # Clear the user's session and log them out
    session.pop("user_id", None)
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200


@auth.route("/backend/current_user")
def get_current_user():
    """
    Retrieve the current user's information.

    This route retrieves the information of the currently logged-in user.

    Returns:
    - A JSON response containing the user's details.
    - In case of unauthorized access, an error message with a 401 status code.

    Args:
    - None
    """
    user_id = current_user.user_id

    # Check if the user is authorized, if not, return an error response
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    # Fetch the user's information from the database using their user_id
    user = User.query.filter_by(user_id=user_id).first()

    # Respond with the user's details in a JSON format
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
    """
    Check if the user is authenticated.

    This route checks if the user is authenticated by validating their token.

    Returns:
    - A JSON response indicating authentication status.
    - In case of an unauthorized or unauthenticated user, an appropriate message with a 401 status code.

    Args:
    - None
    """
    user_id = current_user.user_id
    print(current_user)

    # Check if the user_id is not set, indicating an unauthorized user
    if user_id is None:
        return jsonify({"message": "User is not authenticated"}), 401

    # Fetch the user's information from the database using their user_id
    user = User.query.get(user_id)

    # If a user with that ID exists, respond with a message indicating authentication
    if user:
        return jsonify({"message": "User is authenticated"}), 200

    else:
        # If no user found, indicate that the user is not authenticated
        return jsonify({"message": "User is not authenticated"}), 401
