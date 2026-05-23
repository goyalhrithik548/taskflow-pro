import { useEffect, useState } from "react";

import api from "../../api/axios.js";
import Navbar from "../../components/Navbar.jsx";

const statusClass = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

export default function TaskMonitoring() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    const { data } = await api.get("/api/admin/tasks");
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const deleteTask = async (task) => {
    if (!confirm(`Delete "${task.title}"?`)) return;
    await api.delete(`/api/tasks/${task._id}`);
    await loadTasks();
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Task Monitoring</h1>
        <section className="mt-6 overflow-hidden rounded-xl bg-white shadow-md">
          {loading ? (
            <div className="flex justify-center p-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Title", "Status", "Due Date", "Created By", "Actions"].map((heading) => (
                      <th key={heading} className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tasks.map((task, index) => {
                    const overdue = task.due_date < today && task.status !== "DONE";
                    return (
                      <tr
                        key={task._id}
                        className={`${overdue ? "bg-red-50" : index % 2 ? "bg-gray-50" : ""} hover:bg-blue-50`}
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{task.title}</td>
                        <td className="px-6 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[task.status]}`}>{task.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{task.due_date}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{task.created_by_user?.full_name || "Deleted user"}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteTask(task)}
                            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
