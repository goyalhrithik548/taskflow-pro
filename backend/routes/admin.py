from bson import ObjectId
from bson.errors import InvalidId
from flask import Blueprint, jsonify

from db import serialize, tasks_col, users_col
from middleware.admin import admin_only
from routes.tasks import tasks_with_users

admin_bp = Blueprint("admin", __name__)


def user_id_or_error(user_id):
    try:
        return ObjectId(user_id), None
    except InvalidId:
        return None, (jsonify({"error": "Invalid user id"}), 400)


@admin_bp.get("/users")
@admin_only
def get_users():
    users = list(users_col.find({}, {"password": 0}).sort("created_at", -1))
    return jsonify(serialize(users)), 200


@admin_bp.patch("/users/<user_id>/status")
@admin_only
def toggle_user_status(user_id):
    object_id, error = user_id_or_error(user_id)
    if error:
        return error

    user = users_col.find_one({"_id": object_id}, {"password": 0})
    if not user:
        return jsonify({"error": "User not found"}), 404

    users_col.update_one({"_id": object_id}, {"$set": {"is_active": not user.get("is_active", True)}})
    updated_user = users_col.find_one({"_id": object_id}, {"password": 0})
    return jsonify(serialize(updated_user)), 200


@admin_bp.delete("/users/<user_id>")
@admin_only
def delete_user(user_id):
    object_id, error = user_id_or_error(user_id)
    if error:
        return error

    result = users_col.delete_one({"_id": object_id})
    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"message": "User deleted"}), 200


@admin_bp.get("/tasks")
@admin_only
def get_admin_tasks():
    return jsonify(serialize(tasks_with_users())), 200


@admin_bp.get("/stats")
@admin_only
def get_stats():
    total_users = users_col.count_documents({})
    total_tasks = tasks_col.count_documents({})
    completed_tasks = tasks_col.count_documents({"status": "DONE"})
    pending_tasks = tasks_col.count_documents({"status": {"$ne": "DONE"}})
    return (
        jsonify(
            {
                "total_users": total_users,
                "total_tasks": total_tasks,
                "completed_tasks": completed_tasks,
                "pending_tasks": pending_tasks,
            }
        ),
        200,
    )
