import os

from flask import Flask
from flask_cors import CORS

from config import Config
from routes.admin import admin_bp
from routes.auth import auth_bp
from routes.logs import logs_bp
from routes.tasks import tasks_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(Config)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(tasks_bp, url_prefix="/api/tasks")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(logs_bp, url_prefix="/api/logs")

    @app.get("/")
    def health():
        return {"message": "Team Task Manager API is running"}

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )
