# TaskFlow Pro

A full-stack team task management and admin dashboard application built using React, Flask, MongoDB Atlas, JWT Authentication, and Tailwind CSS.

The application supports secure authentication, role-based access control, task management, admin monitoring, activity logging, and full cloud deployment using Vercel, Railway, and MongoDB Atlas.

---

# Live Deployment

## Frontend (Vercel)
https://taskflow-e55moje28-hrithik-kumar-s-projects.vercel.app

## Backend (Railway)
https://taskflow-pro-production-1a73.up.railway.app

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
