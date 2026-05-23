from functools import wraps

import jwt
from bson import ObjectId
from flask import g, jsonify, request

from config import Config
from db import users_col


def verify_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Unauthorized"}), 401

        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
            user = users_col.find_one({"_id": ObjectId(payload["id"])})
            if not user:
                return jsonify({"error": "User not found"}), 401
            g.current_user = user
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except Exception:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated
