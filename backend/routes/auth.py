from datetime import datetime

import bcrypt
import jwt
from flask import Blueprint, g, jsonify, request

from config import Config
from db import serialize, users_col, write_log
from middleware.auth import verify_token

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/register")
def register():
    data = request.get_json(silent=True) or {}
    full_name = data.get("full_name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not full_name or not email or not password:
        return jsonify({"error": "full_name, email, and password are required"}), 400

    if users_col.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 409

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    users_col.insert_one(
        {
            "full_name": full_name,
            "email": email,
            "password": hashed_password,
            "role": "User",
            "is_active": True,
            "created_at": datetime.utcnow(),
        }
    )

    return jsonify({"message": "Registered successfully"}), 201


@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    user = users_col.find_one({"email": email})

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    if user.get("is_active") is False:
        return jsonify({"error": "Account is deactivated"}), 403
    if not bcrypt.checkpw(password.encode(), user["password"].encode()):
        return jsonify({"error": "Invalid credentials"}), 401

    payload = {
        "id": str(user["_id"]),
        "email": user["email"],
        "role": user["role"],
        "full_name": user["full_name"],
    }
    token = jwt.encode(payload, Config.JWT_SECRET, algorithm="HS256")
    write_log(user["_id"], user["full_name"], "LOGIN")

    return (
        jsonify(
            {
                "token": token,
                "user": {
                    "id": str(user["_id"]),
                    "full_name": user["full_name"],
                    "email": user["email"],
                    "role": user["role"],
                },
            }
        ),
        200,
    )


@auth_bp.get("/me")
@verify_token
def me():
    user = dict(g.current_user)
    user.pop("password", None)
    user["id"] = user.pop("_id")
    return jsonify(serialize(user)), 200
