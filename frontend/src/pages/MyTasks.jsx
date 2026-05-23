import { useEffect, useState } from "react";

import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";

const emptyForm = { title: "", description: "", status: "TODO", due_date: "" };
const statusClass = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/tasks");
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/api/tasks", form);
      setForm(emptyForm);
      setShowModal(false);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.error || "Could not create task");
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (task, status) => {
    await api.put(`/api/tasks/${task._id}`, { status });
    await loadTasks();
  };

  const deleteTask = async (task) => {
    if (!confirm(`Delete "${task.title}"?`)) return;
    await api.delete(`/api/tasks/${task._id}`);
    await loadTasks();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-sm text-gray-600">Create tasks, update progress, and clear completed work.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>

        <section className="mt-6 overflow-hidden rounded-xl bg-white shadow-md">
          {loading ? (
            <div className="flex justify-center p-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            </div>
          ) : tasks.length === 0 ? (
            <div className="p-16 text-center text-gray-500">
              <div className="text-4xl">[]</div>
              <p className="mt-3 font-medium">No tasks yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["Title", "Description", "Status", "Due Date", "Actions"].map((heading) => (
                      <th key={heading} className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tasks.map((task, index) => (
                    <tr key={task._id} className={index % 2 ? "bg-gray-50 hover:bg-blue-50" : "hover:bg-blue-50"}>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{task.title}</td>
                      <td className="max-w-md px-6 py-4 text-sm text-gray-600">{task.description}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[task.status]}`}>{task.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{task.due_date}</td>
                      <td className="space-y-2 px-6 py-4 sm:space-x-2 sm:space-y-0">
                        <select
                          value={task.status}
                          onChange={(event) => updateStatus(task, event.target.value)}
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        >
                          <option value="TODO">TODO</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="DONE">DONE</option>
                        </select>
                        <button
                          onClick={() => deleteTask(task)}
                          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 px-4">
          <section className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Add Task</h2>
              <button onClick={() => setShowModal(false)} className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100">
                Close
              </button>
            </div>
            {error && <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{error}</div>}
            <form onSubmit={createTask} className="mt-5 space-y-4">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                required
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                rows="4"
                required
              />
              <select
                value={form.status}
                onChange={(event) => setForm({ ...form, status: event.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
              <input
                type="date"
                value={form.due_date}
                onChange={(event) => setForm({ ...form, due_date: event.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                required
              />
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Create Task"}
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
