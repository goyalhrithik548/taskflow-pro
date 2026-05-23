import { useEffect, useState } from "react";

import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const statusClass = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

function StatCard({ label, value, color }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="mt-2 text-sm font-medium text-gray-600">{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (isAdmin) {
          const [statsRes, tasksRes] = await Promise.all([api.get("/api/admin/stats"), api.get("/api/tasks")]);
          setStats(statsRes.data);
          setTasks(tasksRes.data);
        } else {
          const { data } = await api.get("/api/tasks");
          setTasks(data);
          setStats({
            total_tasks: data.length,
            completed_tasks: data.filter((task) => task.status === "DONE").length,
            pending_tasks: data.filter((task) => task.status !== "DONE").length,
          });
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [isAdmin]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        {loading ? (
          <div className="mt-16 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {isAdmin && <StatCard label="Total Users" value={stats.total_users} color="text-blue-600" />}
              <StatCard label={isAdmin ? "Total Tasks" : "My Total Tasks"} value={stats.total_tasks} color="text-purple-600" />
              <StatCard label={isAdmin ? "Completed" : "My Completed"} value={stats.completed_tasks} color="text-green-600" />
              <StatCard label={isAdmin ? "Pending" : "My Pending"} value={stats.pending_tasks} color="text-yellow-600" />
            </div>
            <section className="mt-8 overflow-hidden rounded-xl bg-white shadow-md">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tasks.slice(0, 5).map((task, index) => (
                      <tr key={task._id} className={index % 2 ? "bg-gray-50 hover:bg-blue-50" : "hover:bg-blue-50"}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.title}</td>
                        <td className="px-6 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[task.status]}`}>{task.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{task.due_date}</td>
                      </tr>
                    ))}
                    {tasks.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                          No tasks yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
