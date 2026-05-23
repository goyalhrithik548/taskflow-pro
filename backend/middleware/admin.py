from functools import wraps

from flask import g, jsonify

from middleware.auth import verify_token


def admin_only(f):
    @wraps(f)
    @verify_token
    def decorated(*args, **kwargs):
        if g.current_user.get("role") != "Admin":
            return jsonify({"error": "Forbidden: Admins only"}), 403
        return f(*args, **kwargs)

    return decorated
