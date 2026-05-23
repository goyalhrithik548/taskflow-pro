from datetime import datetime

from bson import ObjectId
from bson.errors import InvalidId
from flask import Blueprint, g, jsonify, request

from db import serialize, tasks_col, write_log
from middleware.auth import verify_token

tasks_bp = Blueprint("tasks", __name__)
VALID_STATUSES = {"TODO", "IN_PROGRESS", "DONE"}


def tasks_with_users(match=None):
    pipeline = []
    if match:
        pipeline.append({"$match": match})
    pipeline.extend(
        [
            {
                "$lookup": {
                    "from": "users",
                    "localField": "created_by",
                    "foreignField": "_id",
                    "as": "created_by_user",
                }
            },
            {"$unwind": {"path": "$created_by_user", "preserveNullAndEmptyArrays": True}},
            {
                "$project": {
                    "created_by_user.password": 0,
                }
            },
            {"$sort": {"created_at": -1}},
        ]
    )
    return list(tasks_col.aggregate(pipeline))


def task_id_or_error(task_id):
    try:
        return ObjectId(task_id), None
    except InvalidId:
        return None, (jsonify({"error": "Invalid task id"}), 400)


@tasks_bp.post("")
@verify_token
def create_task():
    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    description = data.get("description", "").strip()
    due_date = data.get("due_date", "").strip()
    status = data.get("status", "TODO")

    if not title or not description or not due_date:
        return jsonify({"error": "title, description, and due_date are required"}), 400
    if status not in VALID_STATUSES:
        return jsonify({"error": "Invalid status"}), 400

    task = {
        "title": title,
        "description": description,
        "status": status,
        "due_date": due_date,
        "created_by": g.current_user["_id"],
        "created_at": datetime.utcnow(),
    }
    result = tasks_col.insert_one(task)
    task["_id"] = result.inserted_id
    write_log(g.current_user["_id"], g.current_user["full_name"], "TASK_CREATED", title)

    return jsonify(serialize(task)), 201


@tasks_bp.get("")
@verify_token
def get_tasks():
    if g.current_user.get("role") == "Admin":
        tasks = tasks_with_users()
    else:
        tasks = tasks_with_users({"created_by": g.current_user["_id"]})
    return jsonify(serialize(tasks)), 200


@tasks_bp.put("/<task_id>")
@verify_token
def update_task(task_id):
    object_id, error = task_id_or_error(task_id)
    if error:
        return error

    task = tasks_col.find_one({"_id": object_id})
    if not task:
        return jsonify({"error": "Task not found"}), 404
    if g.current_user.get("role") == "User" and task["created_by"] != g.current_user["_id"]:
        return jsonify({"error": "Forbidden"}), 403

    data = request.get_json(silent=True) or {}
    allowed_fields = {"title", "description", "status", "due_date"}
    updates = {field: data[field] for field in allowed_fields if field in data}
    if "status" in updates and updates["status"] not in VALID_STATUSES:
        return jsonify({"error": "Invalid status"}), 400
    if not updates:
        return jsonify({"error": "No valid fields provided"}), 400

    tasks_col.update_one({"_id": object_id}, {"$set": updates})
    updated_task = tasks_col.find_one({"_id": object_id})
    write_log(
        g.current_user["_id"],
        g.current_user["full_name"],
        "TASK_UPDATED",
        updated_task.get("title", task["title"]),
    )

    return jsonify(serialize(updated_task)), 200


@tasks_bp.delete("/<task_id>")
@verify_token
def delete_task(task_id):
    object_id, error = task_id_or_error(task_id)
    if error:
        return error

    task = tasks_col.find_one({"_id": object_id})
    if not task:
        return jsonify({"error": "Task not found"}), 404
    if g.current_user.get("role") == "User" and task["created_by"] != g.current_user["_id"]:
        return jsonify({"error": "Forbidden"}), 403

    write_log(g.current_user["_id"], g.current_user["full_name"], "TASK_DELETED", task["title"])
    tasks_col.delete_one({"_id": object_id})
    return jsonify({"message": "Task deleted"}), 200
