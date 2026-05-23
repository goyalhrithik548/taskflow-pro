import React from "react";
import { useEffect, useState } from "react";

import api from "../../api/axios.js";
import Navbar from "../../components/Navbar.jsx";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    const { data } = await api.get("/api/admin/users");
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleStatus = async (user) => {
    await api.patch(`/api/admin/users/${user._id}/status`);
    await loadUsers();
  };

  const deleteUser = async (user) => {
    if (!confirm(`Delete ${user.full_name}?`)) return;
    await api.delete(`/api/admin/users/${user._id}`);
    await loadUsers();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
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
                    {["Name", "Email", "Role", "Status", "Joined Date", "Actions"].map((heading) => (
                      <th key={heading} className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user, index) => (
                    <tr key={user._id} className={index % 2 ? "bg-gray-50 hover:bg-blue-50" : "hover:bg-blue-50"}>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.created_at).toLocaleDateString()}</td>
                      <td className="space-y-2 px-6 py-4 sm:space-x-2 sm:space-y-0">
                        <button
                          onClick={() => toggleStatus(user)}
                          className={`rounded-lg px-3 py-2 text-sm font-semibold text-white ${
                            user.is_active ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {user.is_active ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => deleteUser(user)}
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
    </div>
  );
}
