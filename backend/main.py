from flask import Blueprint, request, redirect, render_template, url_for, jsonify
from flask_login import login_required
from backend.models import Task, Board
from flask_login import login_required, logout_user, current_user, login_user


from . import db

main = Blueprint("main", __name__)


@main.route("/backend/get_boards", methods=["GET"])
@login_required
def get_boards():
    # Get all boards associated with the current user
    user_id = current_user.user_id
    boards = Board.query.filter_by(user_id=user_id).all()

    board_list = [
        {
            "board_id": board.board_id,
            "board_title": board.board_title,
            # You can include additional details or actions related to the boards here
        }
        for board in boards
    ]

    return jsonify({"boards": board_list}), 200


@main.route("/backend/create_board", methods=["POST"])
@login_required
def create_board():
    if request.method == "POST":
        data = request.json  # Receive data as JSON
        title = data.get("title")

        if title:
            # Get the user ID of the currently logged-in user
            user_id = current_user.user_id

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


@main.route("/backend/get_tasks", methods=["GET"])
@login_required
def get_tasks():
    # if status not in ["new", "pending", "completed"]:
    #     return jsonify({"message": "Invalid status"}), 400

    user_id = current_user.user_id  # Get the user ID of the currently logged-in user
    tasks = Task.query.filter_by(user_id=user_id).all()

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
    if request.method == "POST":
        data = request.json  # Receive data as JSON
        task_description = data.get("task")
        status = data.get("status")
        parent_task_id = data.get("parent_task_id")
        board_id = data.get("board_id")

        # Get the user ID of the currently logged-in user
        user_id = current_user.user_id

        if task_description:
            new_task = Task(
                task_description=task_description,
                status=status,
                parent_id=parent_task_id,
                user_id=user_id,  # Associate the task with the current user
                board_id=board_id,  # Associate the task with a board
            )
            db.session.add(new_task)
            db.session.commit()

            # Return the ID of the newly created task
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

            # Return the updated task
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


@main.route("/backend/change_parent_task", methods=["PUT"])
def change_parent_task():
    # Parse subtask_id and new_parent_task_id from the request parameters
    subtask_id = int(request.args.get("subtask_id"))
    new_parent_task_id = int(request.args.get("new_parent_task_id"))

    # Retrieve the subtask and the new parent task
    subtask = Task.query.get(subtask_id)
    new_parent_task = Task.query.get(new_parent_task_id)

    if subtask is None or new_parent_task is None:
        return jsonify({"message": "Subtask or new parent task not found"}, 404)

    # Update the parent_task_id of the subtask to the new parent task's ID
    subtask.parent_task_id = new_parent_task_id
    db.session.commit()

    return jsonify({"message": "Subtask moved successfully"}, 200)


# Create a route for task deletion
@main.route("/backend/delete_task/<int:task_id>", methods=["DELETE", "OPTIONS"])
def delete_task(task_id):
    try:
        task = Task.query.get(task_id)
        if task:
            db.session.delete(task)
            db.session.commit()
            return jsonify({"message": "Task deleted successfully"}), 200
        else:
            return jsonify({"message": "Task not found"}), 404
    except Exception as e:
        return jsonify({"message": "Failed to delete task", "error": str(e)}), 500
