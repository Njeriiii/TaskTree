import json
from flask import Flask, Response
from flask.testing import FlaskClient
from flask_login import login_user, current_user
from backend.models import User, Board, Task
from . import db

# Import your Flask app
from backend import create_app, db

app = create_app()
app.app_context().push()


def test_get_boards():
    with app.test_client() as client:
        # Create a test user
        user = User(
            email="test@example.com",
            password="password123",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        # Log in the user
        login_user(user)

        # Create a test board associated with the user
        board = Board(
            board_title="Test Board",
            user_id=user.user_id,
        )
        db.session.add(board)
        db.session.commit()

        response: Response = client.get("/backend/get_boards")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["boards"][0]["board_title"] == "Test Board"


def test_create_board():
    with app.test_client() as client:
        # Create a test user
        user = User(
            email="test@example.com",
            password="password123",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        # Log in the user
        login_user(user)

        data = {"title": "New Board"}
        response: Response = client.post("/backend/create_board", json=data)
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "Board created successfully"
        assert data["board_title"] == "New Board"


def test_update_board():
    with app.test_client() as client:
        # Create a test user
        user = User(
            email="test@example.com",
            password="password123",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        # Log in the user
        login_user(user)

        # Create a test board associated with the user
        board = Board(
            board_title="Test Board",
            user_id=user.user_id,
        )
        db.session.add(board)
        db.session.commit()

        data = {"board_title": "Updated Board"}
        response: Response = client.put(
            f"/backend/update_board/{board.board_id}", json=data
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "Board updated successfully"
        assert data["board_title"] == "Updated Board"


# ... (previous test cases)


def test_get_tasks():
    with app.test_client() as client:
        # Create a test user
        user = User(
            email="test@example.com",
            password="password123",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        # Log in the user
        login_user(user)

        # Create a test board associated with the user
        board = Board(
            board_title="Test Board",
            user_id=user.user_id,
        )
        db.session.add(board)
        db.session.commit()

        # Create a test task associated with the user and board
        task = Task(
            task_description="Test Task",
            status="incomplete",
            user_id=user.user_id,
            board_id=board.board_id,
        )
        db.session.add(task)
        db.session.commit()

        response: Response = client.get("/backend/get_tasks")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["tasks"][0]["task_description"] == "Test Task"


def test_add_task():
    with app.test_client() as client:
        # Create a test user
        user = User(
            email="test@example.com",
            password="password123",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        # Log in the user
        login_user(user)

        # Create a test board associated with the user
        board = Board(
            board_title="Test Board",
            user_id=user.user_id,
        )
        db.session.add(board)
        db.session.commit()

        data = {
            "task": "New Task",
            "status": "incomplete",
            "parent_task_id": None,
            "board_id": board.board_id,
        }
        response: Response = client.post("/backend/add_task", json=data)
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "Task added successfully"
        assert data["task_description"] == "New Task"


def test_update_task():
    with app.test_client() as client:
        # Create a test user
        user = User(
            email="test@example.com",
            password="password123",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        # Log in the user
        login_user(user)

        # Create a test board associated with the user
        board = Board(
            board_title="Test Board",
            user_id=user.user_id,
        )
        db.session.add(board)
        db.session.commit()

        # Create a test task associated with the user and board
        task = Task(
            task_description="Test Task",
            status="incomplete",
            user_id=user.user_id,
            board_id=board.board_id,
        )
        db.session.add(task)
        db.session.commit()

        data = {
            "task_description": "Updated Task",
            "status": "completed",
        }
        response: Response = client.put(
            f"/backend/update_task/{task.task_id}", json=data
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "Task updated successfully"
        assert data["task_description"] == "Updated Task"


def test_mark_task_complete():
    with app.test_client() as client:
        # Create a test user
        user = User(
            email="test@example.com",
            password="password123",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        # Log in the user
        login_user(user)

        # Create a test board associated with the user
        board = Board(
            board_title="Test Board",
            user_id=user.user_id,
        )
        db.session.add(board)
        db.session.commit()

        # Create a test task associated with the user and board
        task = Task(
            task_description="Test Task",
            status="incomplete",
            user_id=user.user_id,
            board_id=board.board_id,
        )
        db.session.add(task)
        db.session.commit()

        response: Response = client.put(
            f"/backend/mark_task_complete?task_id={task.task_id}"
        )
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "Task 'marked as complete' successfully"
        assert data["status"] == "completed"


def test_change_board():
    with app.test_client() as client:
        # Create a test user
        user = User(
            email="test@example.com",
            password="password123",
            first_name="John",
            last_name="Doe",
        )
        db.session.add(user)
        db.session.commit()

        # Log in the user
        login_user(user)

        # Create two test boards associated with the user
        board1 = Board(
            board_title="Board 1",
            user_id=user.user_id,
        )
        board2 = Board(
            board_title="Board 2",
            user_id=user.user_id,
        )
        db.session.add(board1)
        db.session.add(board2)
        db.session.commit()

        # Create a test task associated with the user and board1
        task = Task(
            task_description="Test Task",
            status="incomplete",
            user_id=user.user_id,
            board_id=board1.board_id,
        )
        db.session.add(task)
        db.session.commit()

        data = {
            "task_id": task.task_id,
            "new_board_id": board2.board_id,
        }
        response: Response = client.put("/backend/change_board", query_string=data)
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "Subtask moved successfully"
        assert data["board_id"] == board2.board_id


if __name__ == "__main__":
    db.create_all()
    test_get_boards()
    test_create_board()
    test_update_board()
    test_get_tasks()
    test_add_task()
    test_update_task()
    test_mark_task_complete()
    test_change_board()
