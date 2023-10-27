from flask import Blueprint, request, jsonify
from flask_login import login_required
from backend.models import Task, Board
from flask_login import login_required, current_user


from . import db

# Create a Blueprint for main routes
main = Blueprint("main", __name__)


@main.route("/backend/get_boards", methods=["GET"])
@login_required
def get_boards():
    """
    Retrieve boards associated with the current user.

    Returns:
    - A JSON response containing board details.
    - In case of unauthorized access, an error message with a 401 status code.
    """

    # Get all boards associated with the current user
    user_id = current_user.user_id

    # Query the database to retrieve all boards associated with the user
    boards = Board.query.filter_by(user_id=user_id).all()

    # Create a list of dictionaries containing board details
    board_list = [
        {
            "board_id": board.board_id,
            "board_title": board.board_title,
            # You can include additional details or actions related to the boards here
        }
        for board in boards
    ]

    # Return a JSON response with the list of boards
    return jsonify({"boards": board_list}), 200


@main.route("/backend/create_board", methods=["POST"])
@login_required
def create_board():
    """
    Create a new board for the current user.

    Returns:
    - A JSON response containing the ID and title of the newly created board.
    - In case of invalid data or request method, appropriate error messages with status codes.
    """
    if request.method == "POST":
        data = request.json  # Receive data as JSON
        title = data.get("title")

        if title:
            # Get the user ID of the currently logged-in user
            user_id = current_user.user_id

            # Create a new board with the provided title
            new_board = Board(board_title=title, user_id=user_id)
            db.session.add(new_board)
            db.session.commit()

            # Return the ID and title of the newly created board
            return (
                jsonify(
                    {
                        "message": "Board created successfully",
                        "board_id": new_board.board_id,
                        "board_title": new_board.board_title,
                    }
                ),
                200,
            )
        else:
            return jsonify({"message": "Invalid board title"}), 400

    return jsonify({"message": "Invalid request method"}), 405


@main.route("/backend/update_board/<int:board_id>", methods=["PUT"])
def update_board(board_id):
    """
    Update an existing board with new information.

    Returns:
    - A JSON response containing the ID and title of the updated board.
    - In case of an invalid board or request method, appropriate error messages with status codes.
    """
    if request.method == "PUT":
        data = request.json  # Receive data as JSON
        board_title = data["board_title"]

        board = Board.query.get(board_id)

        if board:
            # Update the board with the provided data
            board.board_title = board_title

            db.session.commit()

            # Return the updated board with its ID and title
            return (
                jsonify(
                    {
                        "message": "Board updated successfully",
                        "board_id": board.board_id,
                        "board_title": board.board_title,
                    }
                ),
                200,
            )
        else:
            return jsonify({"message": "Board not found"}, 404)

    return jsonify({"message": "Invalid request method"}, 405)


@main.route("/backend/get_tasks", methods=["GET"])
@login_required
def get_tasks():
    """
    Retrieve tasks associated with the current user.

    Returns:
    - A JSON response containing task details.
    - In case of unauthorized access, an error message with a 401 status code.
    """

    # Get the user ID of the currently logged-in user
    user_id = current_user.user_id

    # Retrieve all tasks associated with the user
    tasks = Task.query.filter_by(user_id=user_id).all()

    # Create a list of tasks and their details
    task_list = [
        {
            "id": task.task_id,
            "task_description": task.task_description,
            "parent_task_id": task.parent_id,
            "status": task.status,
            "board_id": task.board_id,
        }
        for task in tasks
    ]

    return jsonify({"tasks": task_list}), 200


@main.route("/backend/add_task", methods=["POST"])
@login_required
def add_task():
    """
    Add a new task for the current user.

    Returns:
    - A JSON response containing the ID, description, status, parent task ID, and board ID of the newly created task.
    - In case of invalid task description or request method, appropriate error messages with status codes.
    """
    if request.method == "POST":
        data = request.json  # Receive data as JSON
        task_description = data.get("task")
        status = data.get("status")
        parent_task_id = data.get("parent_task_id")
        board_id = data.get("board_id")

        # Get the user ID of the currently logged-in user
        user_id = current_user.user_id

        if task_description:
            # Create a new task with the provided details
            new_task = Task(
                task_description=task_description,
                status=status,
                parent_id=parent_task_id,
                user_id=user_id,  # Associate the task with the current user
                board_id=board_id,  # Associate the task with a board
            )
            db.session.add(new_task)
            db.session.commit()

            # Return the ID of the newly created task along with other details
            return (
                jsonify(
                    {
                        "message": "Task added successfully",
                        "task_id": new_task.task_id,
                        "task_description": new_task.task_description,
                        "task_status": new_task.status,
                        "parent_task_id": new_task.parent_id,
                        "board_id": new_task.board_id,
                    }
                ),
                200,
            )
        else:
            return jsonify({"message": "Invalid task description"}), 400

    return jsonify({"message": "Invalid request method"}), 405


@main.route("/backend/update_task/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    """
    Update an existing task with new information.

    Returns:
    - A JSON response containing the ID, description, and status of the updated task.
    - In case of an invalid task or request method, appropriate error messages with status codes.
    """
    if request.method == "PUT":
        data = request.json  # Receive data as JSON
        task_description = data.get("task_description")
        status = data.get("status")

        task = Task.query.get(task_id)

        if task:
            # Update the task with the provided data
            task.task_description = task_description
            task.status = status

            db.session.commit()

            # Return the updated task with its ID, description, and status
            return (
                jsonify(
                    {
                        "message": "Task updated successfully",
                        "task_id": task.task_id,
                        "task_description": task.task_description,
                        "status": task.status,
                    }
                ),
                200,
            )
        else:
            return jsonify({"message": "Task not found"}, 404)

    return jsonify({"message": "Invalid request method"}, 405)


@main.route("/backend/mark_task_complete", methods=["PUT"])
def mark_task_complete():
    """
    Mark a task as 'completed'.

    Returns:
    - A JSON response indicating the success of marking the task as 'completed'.
    - In case of an invalid task or request method, appropriate error messages with status codes.
    """
    if request.method == "PUT":
        task_id = int(request.args.get("task_id"))

        task = Task.query.get(task_id)

        if task:
            task.status = "completed"

            db.session.commit()

            # Return the updated task with its new status
            return (
                jsonify(
                    {
                        "message": "Task 'marked as complete' successfully",
                        "task_id": task.task_id,
                        "task_description": task.task_description,
                        "status": task.status,
                    }
                ),
                200,
            )
        else:
            return jsonify({"message": "Task not found"}, 404)

    return jsonify({"message": "Invalid request method"}, 405)


@main.route("/backend/change_board", methods=["PUT"])
def change_board():
    """
    Move a task to a different board.

    Returns:
    - A JSON response indicating the success of moving the task.
    - In case of an invalid task, new board, or request method, appropriate error messages with status codes.
    """

    task_id = int(request.args.get("task_id"))
    new_board_id = int(request.args.get("new_board_id"))

    # Retrieve the task and the new board
    task = Task.query.get(task_id)
    new_board = Task.query.get(new_board_id)

    if task is None or new_board is None:
        return jsonify({"message": "Task or Board task not found"}, 404)

    # Update the parent_task_id of the subtask to the new parent task's ID
    task.board_id = new_board_id
    db.session.commit()

    return jsonify({"message": "Subtask moved successfully"}, 200)
