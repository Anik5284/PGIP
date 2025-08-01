"use client";

import { useEffect, useState } from "react";

interface Alert {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function UserAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = "123"; // Replace with actual user ID from session/context

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch(`/api/alerts?userId=${userId}`, {
          headers: { Accept: "application/json" },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load alerts");

        setAlerts(data.alerts || []);
      } catch (err: any) {
        console.error("Error fetching alerts:", err);
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAlerts();
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-rose-700 mb-6 text-center">
          🚨 Your Alerts
        </h1>

        {loading && (
          <p className="text-center text-rose-500 text-lg">Loading alerts...</p>
        )}

        {error && (
          <p className="text-center text-red-600 font-medium">❌ {error}</p>
        )}

        {!loading && !error && alerts.length === 0 && (
          <div className="bg-white border border-dashed border-rose-300 p-6 rounded-lg text-center text-gray-500">
            You have no alerts at the moment.
          </div>
        )}

        <ul className="space-y-6">
          {alerts.map((alert) => (
            <li
              key={alert._id}
              className="bg-white border-l-4 border-red-500 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
            >
              <h2 className="text-lg font-bold text-red-600">{alert.title}</h2>
              <p className="mt-2 text-red-500 font-medium">{alert.description}</p>
              <p className="text-xs text-gray-400 mt-3">
                🕒 {new Date(alert.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
