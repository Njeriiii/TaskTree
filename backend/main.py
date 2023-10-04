from flask import Blueprint, request, redirect, render_template, url_for, jsonify
from flask_login import login_required
from backend.models import Task

from . import db

main = Blueprint("main", __name__)


@main.route("/backend/get_tasks/<status>", methods=["GET"])
def get_tasks(status):
    if status not in ["new", "pending", "completed"]:
        return jsonify({"message": "Invalid status"}), 400

    tasks = Task.query.filter_by(status=status).all()
    task_list = [
        {"id": task.id, "task_description": task.task_description} for task in tasks
    ]

    return jsonify({"tasks": task_list}), 200


@main.route("/backend/add_task", methods=["POST"])
def add_task():
    if request.method == "POST":
        data = request.json  # Receive data as JSON
        task_description = data.get("task")
        status = data.get("status")
        parent_task_id = data.get("parent_task_id")

        if task_description:
            new_task = Task(
                task_description=task_description,
                status=status,
                parent_id=parent_task_id,
            )
            db.session.add(new_task)
            db.session.commit()

            #  Return the ID of the newly created task
            return (
                jsonify(
                    {
                        "message": "Task added successfully",
                        "task_id": new_task.id,
                        "task_description": new_task.task_description,
                        "task_status": new_task.status,
                    }
                ),
                200,
            )
        else:
            return jsonify({"message": "Invalid task description"}), 400

    return jsonify({"message": "Invalid request method"}), 405


@main.route("/backend/add_sub_task", methods=["POST"])
def add_sub_task():
    if request.method == "POST":
        data = request.json  # Receive data as JSON
        task_description = data.get("task")
        status = data.get("status")
        parent_task_id = data.get("parent_task_id")
        print(parent_task_id)

        if not task_description:
            return jsonify({"message": "Task description is required"}), 400

        if not parent_task_id or parent_task_id == 0:
            return jsonify({"message": "Parent task ID is required"}), 400

        # parent_task = Task.query.get(parent_task_id)

        # if not parent_task:
        #     return jsonify({"message": "Parent task not found"}), 404

        sub_task = Task(
            task_description=task_description,
            status=status,
            parent_id=parent_task_id,
        )

        db.session.add(sub_task)
        db.session.commit()

        return (
            jsonify(
                {
                    "message": "Sub-Task added successfully",
                    "task_id": sub_task.id,
                    "task_description": sub_task.task_description,
                    "parent_id": sub_task.parent_id,
                }
            ),
            200,
        )

    return jsonify({"message": "Invalid request method"}), 405


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
