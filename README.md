# TaskFlow Pro

A full-stack task management and admin dashboard application built using React, Flask, MongoDB, JWT Authentication, and Tailwind CSS.


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

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Admin Role Support

## User Features
- Create Tasks
- View Personal Tasks
- Task Dashboard
- Secure Authentication Context

## Admin Features
- Admin Dashboard
- User Management
- Task Monitoring
- Activity Logs

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- JWT Decode

## Backend
- Flask
- Flask-CORS
- PyMongo
- JWT
- bcrypt
- MongoDB Atlas

---

# Project Structure

```bash
backend/
frontend/
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Create virtual environment

```bash
python -m venv venv
```

## Activate virtual environment

### Windows

```bash
venv\Scripts\activate
```

---

## Install dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create a `.env` file inside `backend/`

```env
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET_KEY=your_secret_key
```

---

# Run Seed Script

```bash
python seed.py
```

This creates demo users and sample data.

---

# Run Backend

```bash
python main.py
```

Backend runs on:

```bash
http://127.0.0.1:5000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

---

## Install dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Demo Credentials

## Admin

```text
Email: admin@demo.com
Password: admin123
```

## User
| Role  | Email          | Password |
|-------|----------------|----------|
| Admin | admin@demo.com | admin123 |
| User  | alice@demo.com | user123  |
| User  | bob@demo.com   | user123  |
---

# Important Notes

- `.env` file is intentionally excluded from GitHub.
- MongoDB Atlas IP access must allow external connections.
- Update frontend API URL before production deployment.

---

# Author

Hrithik Kumar
