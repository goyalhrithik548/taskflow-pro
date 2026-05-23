import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const navLinkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium ${
    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/dashboard" className="text-lg font-bold text-gray-900">
            Team Task Manager
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/my-tasks" className={navLinkClass}>
              My Tasks
            </NavLink>
            {isAdmin && (
              <>
                <NavLink to="/admin" className={navLinkClass}>
                  Admin Dashboard
                </NavLink>
                <NavLink to="/admin/users" className={navLinkClass}>
                  Users
                </NavLink>
                <NavLink to="/admin/tasks" className={navLinkClass}>
                  Task Monitor
                </NavLink>
                <NavLink to="/admin/logs" className={navLinkClass}>
                  Logs
                </NavLink>
              </>
            )}
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {user?.full_name} - {user?.role}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
          <button
            onClick={() => setOpen((value) => !value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 md:hidden"
          >
            Menu
          </button>
        </div>
        {open && (
          <div className="space-y-2 border-t border-gray-100 py-3 md:hidden">
            <NavLink to="/dashboard" onClick={() => setOpen(false)} className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/my-tasks" onClick={() => setOpen(false)} className={navLinkClass}>
              My Tasks
            </NavLink>
            {isAdmin && (
              <>
                <NavLink to="/admin" onClick={() => setOpen(false)} className={navLinkClass}>
                  Admin Dashboard
                </NavLink>
                <NavLink to="/admin/users" onClick={() => setOpen(false)} className={navLinkClass}>
                  Users
                </NavLink>
                <NavLink to="/admin/tasks" onClick={() => setOpen(false)} className={navLinkClass}>
                  Task Monitor
                </NavLink>
                <NavLink to="/admin/logs" onClick={() => setOpen(false)} className={navLinkClass}>
                  Logs
                </NavLink>
              </>
            )}
            <div className="flex items-center justify-between pt-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                {user?.full_name} - {user?.role}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
