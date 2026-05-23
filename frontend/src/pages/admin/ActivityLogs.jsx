import React from "react";
import { useEffect, useState } from "react";

import api from "../../api/axios.js";
import Navbar from "../../components/Navbar.jsx";

const actionClass = {
  LOGIN: "bg-blue-100 text-blue-700",
  TASK_CREATED: "bg-green-100 text-green-700",
  TASK_UPDATED: "bg-yellow-100 text-yellow-700",
  TASK_DELETED: "bg-red-100 text-red-700",
};

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/logs").then(({ data }) => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
        <section className="mt-6 overflow-hidden rounded-xl bg-white shadow-md">
          {loading ? (
            <div className="flex justify-center p-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            </div>
          ) : logs.length === 0 ? (
            <div className="p-16 text-center text-gray-500">
              <div className="text-4xl">[]</div>
              <p className="mt-3 font-medium">No activity yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {["User", "Action", "Details", "Time"].map((heading) => (
                      <th key={heading} className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {logs.map((log, index) => (
                    <tr key={log._id} className={index % 2 ? "bg-gray-50 hover:bg-blue-50" : "hover:bg-blue-50"}>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{log.user_name || log.user?.full_name || "Deleted user"}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${actionClass[log.action] || "bg-gray-100 text-gray-700"}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.details || "-"}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(log.timestamp).toLocaleString()}</td>
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
