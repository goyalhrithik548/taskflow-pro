import { useEffect, useState } from "react";

import api from "../../api/axios.js";
import Navbar from "../../components/Navbar.jsx";

function StatCard({ icon, label, value, color }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <span className={`rounded-lg p-3 text-xl ${color.bg} ${color.text}`}>{icon}</span>
        <span className={`text-3xl font-bold ${color.text}`}>{value}</span>
      </div>
      <div className="mt-4 text-sm font-semibold text-gray-600">{label}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/api/admin/stats").then(({ data }) => setStats(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        {!stats ? (
          <div className="mt-16 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon="U" label="Total Users" value={stats.total_users} color={{ bg: "bg-blue-50", text: "text-blue-600" }} />
            <StatCard icon="T" label="Total Tasks" value={stats.total_tasks} color={{ bg: "bg-purple-50", text: "text-purple-600" }} />
            <StatCard icon="D" label="Completed Tasks" value={stats.completed_tasks} color={{ bg: "bg-green-50", text: "text-green-600" }} />
            <StatCard icon="P" label="Pending Tasks" value={stats.pending_tasks} color={{ bg: "bg-yellow-50", text: "text-yellow-600" }} />
          </div>
        )}
      </main>
    </div>
  );
}
