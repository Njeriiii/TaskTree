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


@main.route("/backend/add_task", methods=["POST", "OPTIONS"])
def add_task():
    if request.method == "POST":
        data = request.json  # Receive data as JSON
        task_description = data.get("task")
        status = data.get("status")

        if task_description:
            new_task = Task(task_description=task_description, status=status)
            db.session.add(new_task)
            db.session.commit()

            return jsonify({"message": "Task added successfully"}), 200

        else:
            return jsonify({"message": "Invalid task description"}), 400

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
