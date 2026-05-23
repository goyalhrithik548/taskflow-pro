from datetime import datetime, timedelta

import bcrypt

from db import logs_col, tasks_col, users_col


def hashed(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


users_col.drop()
tasks_col.drop()
logs_col.drop()

now = datetime.utcnow()
users = [
    {
        "full_name": "Admin User",
        "email": "admin@demo.com",
        "password": hashed("admin123"),
        "role": "Admin",
        "is_active": True,
        "created_at": now,
    },
    {
        "full_name": "Alice Johnson",
        "email": "alice@demo.com",
        "password": hashed("user123"),
        "role": "User",
        "is_active": True,
        "created_at": now,
    },
    {
        "full_name": "Bob Smith",
        "email": "bob@demo.com",
        "password": hashed("user123"),
        "role": "User",
        "is_active": True,
        "created_at": now,
    },
]
inserted = users_col.insert_many(users).inserted_ids
admin_id, alice_id, bob_id = inserted

tasks_col.insert_many(
    [
        {
            "title": "Prepare sprint plan",
            "description": "Outline priorities and assignments for the next sprint.",
            "status": "TODO",
            "due_date": (now + timedelta(days=3)).date().isoformat(),
            "created_by": admin_id,
            "created_at": now,
        },
        {
            "title": "Design task table",
            "description": "Create a clear task table layout for daily use.",
            "status": "IN_PROGRESS",
            "due_date": (now + timedelta(days=1)).date().isoformat(),
            "created_by": alice_id,
            "created_at": now,
        },
        {
            "title": "Write API notes",
            "description": "Document key endpoints for the team.",
            "status": "DONE",
            "due_date": (now - timedelta(days=1)).date().isoformat(),
            "created_by": alice_id,
            "created_at": now,
        },
        {
            "title": "Review overdue tasks",
            "description": "Check blocked work and update owners.",
            "status": "TODO",
            "due_date": (now - timedelta(days=2)).date().isoformat(),
            "created_by": bob_id,
            "created_at": now,
        },
        {
            "title": "Create onboarding checklist",
            "description": "List setup steps for new team members.",
            "status": "IN_PROGRESS",
            "due_date": (now + timedelta(days=5)).date().isoformat(),
            "created_by": bob_id,
            "created_at": now,
        },
    ]
)

users_col.create_index("email", unique=True)

print("Seeding complete!")
