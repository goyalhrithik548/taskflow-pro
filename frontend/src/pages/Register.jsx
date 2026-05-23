import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios.js";

export default function Register() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "", confirm_password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/auth/register", {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
      });
      navigate("/login", { state: { message: "Registered successfully. You can log in now." } });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <section className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
        <p className="mt-1 text-sm text-gray-600">Start tracking your team tasks.</p>
        {error && <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {[
            ["full_name", "Full name", "text"],
            ["email", "Email", "email"],
            ["password", "Password", "password"],
            ["confirm_password", "Confirm password", "password"],
          ].map(([name, placeholder, type]) => (
            <input
              key={name}
              type={type}
              placeholder={placeholder}
              value={form[name]}
              onChange={(event) => setForm({ ...form, [name]: event.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
