from datetime import datetime

from bson import ObjectId
from pymongo import MongoClient

from config import Config

client = MongoClient(Config.MONGO_URI)
db = client.get_database("team_task_manager")

users_col = db["users"]
tasks_col = db["tasks"]
logs_col = db["activity_logs"]


def serialize(value):
    if isinstance(value, list):
        return [serialize(item) for item in value]
    if isinstance(value, dict):
        return {key: serialize(val) for key, val in value.items()}
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, datetime):
        return value.isoformat()
    return value


def write_log(user_id, user_name, action, details=""):
    logs_col.insert_one(
        {
            "user_id": user_id,
            "user_name": user_name,
            "action": action,
            "details": details,
            "timestamp": datetime.utcnow(),
        }
    )
