import json
from flask import session
from werkzeug.security import generate_password_hash
from backend.models import User
from flask_login import current_user

# Import your Flask app
from backend import create_app, db

app = create_app()
app.app_context().push()


def test_register_new_user():
    with app.test_client() as client:
        data = {
            "password": "password123",
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
        }
        response = client.post(
            "/backend/register",
            data=json.dumps(data),
            content_type="application/json",
        )
        print(response)
        assert response.status_code == 201
        assert response.json["message"] == "User registered successfully"
        assert response.json["email"] == "test@example.com"

        user = User.query.filter_by(email="test@example.com").first()
        assert user is not None
        assert user.first_name == "John"
        assert user.last_name == "Doe"
        assert generate_password_hash("password123", method="sha256") == user.password


def test_register_existing_user():
    # Create a test user
    user = User(
        password=generate_password_hash("password123", method="sha256"),
        email="test@example.com",
        first_name="John",
        last_name="Doe",
    )
    db.session.add(user)
    db.session.commit()

    with app.test_client() as client:
        data = {
            "password": "password123",
            "email": "test@example.com",
            "first_name": "Jane",
            "last_name": "Doe",
        }
        response = client.post(
            "/backend/register",
            data=json.dumps(data),
            content_type="application/json",
        )
        assert response.status_code == 400
        assert response.json["message"] == "User already exists"

        # Check that the existing user was not updated
        user = User.query.filter_by(email="test@example.com").first()
        assert user is not None
        assert user.first_name == "John"
        assert user.last_name == "Doe"
        assert generate_password_hash("password123", method="sha256") == user.password


def test_login_user():
    with app.test_client() as client:
        # Create a test user
        user = User(
            password=generate_password_hash("password123", method="sha256"),
            email="test@example.com",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        data = {
            "email": "test@example.com",
            "password": "password123",
        }
        response = client.post(
            "/backend/login",
            data=json.dumps(data),
            content_type="application/json",
        )
        assert response.status_code == 200
        assert response.json["message"] == "User logged in successfully"
        assert current_user.is_authenticated


def test_logout_user():
    with app.test_client() as client:
        response = client.get("/backend/logout")
        assert response.status_code == 200
        assert response.json["message"] == "Logged out successfully"
        assert not current_user.is_authenticated


def test_get_current_user():
    with app.test_client() as client:
        # Create a test user
        user = User(
            password=generate_password_hash("password123", method="sha256"),
            email="test@example.com",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        # Log in the user
        data = {
            "email": "test@example.com",
            "password": "password123",
        }
        client.post(
            "/backend/login",
            data=json.dumps(data),
            content_type="application/json",
        )

        response = client.get("/backend/current_user")
        assert response.status_code == 200
        assert response.json["message"] == "User found successfully"
        assert response.json["email"] == "test@example.com"


def test_check_authentication():
    with app.test_client() as client:
        response = client.get("/backend/check_authentication")
        print(response)
        assert response.status_code == 401
        assert response.json["message"] == "User is not authenticated"

        # Create a test user
        user = User(
            password=generate_password_hash("password123", method="sha256"),
            email="test@example.com",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        # Log in the user
        data = {
            "email": "test@example.com",
            "password": "password123",
        }
        client.post(
            "/backend/login",
            data=json.dumps(data),
            content_type="application/json",
        )

        response = client.get("/backend/check_authentication")
        assert response.status_code == 200
        assert response.json["message"] == "User is authenticated"


if __name__ == "__main__":
    db.create_all()
    test_register_new_user()
    test_register_existing_user()
    test_login_user()
    test_logout_user()
    test_get_current_user()
    test_check_authentication()
