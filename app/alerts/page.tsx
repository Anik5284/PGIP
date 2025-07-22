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

  const userId = "user123"; // TODO: Replace with dynamic user ID from session

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch(`/api/alert?userId=${userId}`, {
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
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Your Alerts</h1>

      {loading && <p>Loading alerts...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && alerts.length === 0 && <p>No alerts yet.</p>}
      {!loading && !error && alerts.length > 0 && (
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li
              key={alert._id}
              className="border border-gray-200 p-4 rounded-md shadow-sm"
            >
              <h2 className="text-lg font-semibold">{alert.title}</h2>
              <p className="text-gray-700">{alert.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(alert.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
