# TaskFlow Pro

A full-stack team task management and admin dashboard application built using React, Flask, MongoDB Atlas, JWT Authentication, and Tailwind CSS.

The application supports secure authentication, role-based access control, task management, admin monitoring, activity logging, and full cloud deployment using Vercel, Railway, and MongoDB Atlas.

---

# Live Deployment

## Frontend (Vercel)

```text
https://taskflow-e55moje28-hrithik-kumar-s-projects.vercel.app
```
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
- bcrypt
- JWT Authentication
- MongoDB Atlas

## Deployment & Cloud
- Vercel (Frontend Hosting)
- Railway (Backend Hosting)
- MongoDB Atlas (Cloud Database)

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login
- Role-Based Access Control
- Admin Authorization Middleware

---

## User Features
- Create Tasks
- View Personal Tasks
- Update Task Status
- Task Dashboard
- Pending/Completed Tracking
- Secure Auth Context

---

## Admin Features
- Admin Dashboard
- User Management
- Task Monitoring
- Activity Logs
- View All Users
- Monitor Team Tasks
- Role-Based Admin Access

---

# Project Structure

```text
/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── db.py
│   ├── seed.py
│   ├── requirements.txt
│   ├── .env
│   │
│   ├── middleware/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── admin.py
│   │
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── tasks.py
│   │   ├── admin.py
│   │   └── logs.py
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   │
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── AdminRoute.jsx
    │   │
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── MyTasks.jsx
    │   │   │
    │   │   └── admin/
    │   │       ├── AdminDashboard.jsx
    │   │       ├── UserManagement.jsx
    │   │       ├── TaskMonitoring.jsx
    │   │       └── ActivityLogs.jsx
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

---

## Create Virtual Environment

```bash
python -m venv venv
```

---

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create a `.env` file inside `backend/`

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

# Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Add IP Access

For development:

```text
0.0.0.0/0
```

4. Copy MongoDB connection string
5. Add it to `.env`

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/team_task_manager?retryWrites=true&w=majority
```

---

# Seed Demo Data

The application automatically seeds demo data on startup if the database is empty.

Demo data includes:
- Admin User
- Demo Users
- Sample Tasks
- Activity Logs

You can also manually run:

```bash
python seed.py
```

---

# Run Backend

```bash
python main.py
```

Backend runs on:

```text
http://127.0.0.1:5000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

# Frontend Environment Variable

Create `.env` inside frontend:

```env
VITE_API_URL=http://127.0.0.1:5000
```

For production:

```env
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```

---

# Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Deployment

## Frontend Deployment
- Hosted on Vercel

## Backend Deployment
- Hosted on Railway

## Database
- MongoDB Atlas

---

# API Routes

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## Tasks

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Admin

```text
GET /api/admin/users
GET /api/admin/tasks
```

## Logs

```text
GET /api/logs
```

---

# Demo Credentials

## Admin

```text
Email: admin@demo.com
Password: admin123
```

---

## Users

| Role | Email | Password |
|------|--------|----------|
| User | alice@demo.com | user123 |
| User | bob@demo.com | user123 |

---

# Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Backend Routes
- Role-Based Access Control
- Secure MongoDB Cloud Connection

---

# Important Notes

- `.env` is excluded from GitHub
- MongoDB Atlas must allow IP access
- Update frontend API URL before deployment
- Change demo credentials before production use

---

# Future Improvements

- Task Assignment System
- Team Collaboration
- Real-Time Notifications
- Email Notifications
- File Uploads
- Advanced Analytics Dashboard
- Docker Deployment
- CI/CD Integration
- Refresh Tokens
- Pagination & Search
- Dark Mode

---

# Author

**Hrithik Kumar**
