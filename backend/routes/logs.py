from flask import Blueprint, jsonify

from db import logs_col, serialize
from middleware.admin import admin_only

logs_bp = Blueprint("logs", __name__)


@logs_bp.get("")
@admin_only
def get_logs():
    logs = list(
        logs_col.aggregate(
            [
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "user_id",
                        "foreignField": "_id",
                        "as": "user",
                    }
                },
                {"$unwind": {"path": "$user", "preserveNullAndEmptyArrays": True}},
                {"$project": {"user.password": 0}},
                {"$sort": {"timestamp": -1}},
            ]
        )
    )
    return jsonify(serialize(logs)), 200
