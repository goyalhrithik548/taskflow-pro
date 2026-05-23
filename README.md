# Team Task Manager

## Tech Stack
- Backend: Python, Flask, MongoDB (PyMongo)
- Frontend: React.js, Tailwind CSS, Vite

## Project Structure
```text
/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── db.py
│   ├── middleware/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── admin.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── tasks.py
│   │   ├── admin.py
│   │   └── logs.py
│   ├── seed.py
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── AdminRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── MyTasks.jsx
    │   │   └── admin/
    │   │       ├── AdminDashboard.jsx
    │   │       ├── UserManagement.jsx
    │   │       ├── TaskMonitoring.jsx
    │   │       └── ActivityLogs.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── postcss.config.js
    ├── tailwind.config.js
    └── package.json
```

## How to Run

### Backend
```bash
cd backend
pip install -r requirements.txt
python seed.py
python main.py
```

The backend starts on http://localhost:5000.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend starts on http://localhost:5173.

## Demo Accounts
| Role  | Email          | Password |
|-------|----------------|----------|
| Admin | admin@demo.com | admin123 |
| User  | alice@demo.com | user123  |
| User  | bob@demo.com   | user123  |

## API Endpoints

### Auth
```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Tasks
```text
POST   /api/tasks
GET    /api/tasks
PUT    /api/tasks/<task_id>
DELETE /api/tasks/<task_id>
```

### Admin
```text
GET    /api/admin/users
PATCH  /api/admin/users/<user_id>/status
DELETE /api/admin/users/<user_id>
GET    /api/admin/tasks
GET    /api/admin/stats
```

### Logs
```text
GET    /api/logs
```
