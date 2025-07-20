// app/user/alerts/page.tsx
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

  // Simulate userId — in real app, fetch from session
  const userId = "123"; // replace with dynamic id if needed

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch(`/api/user/alerts?userId=${userId}`);
        const data = await res.json();
        setAlerts(data.alerts || []);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Your Alerts</h1>

      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p>No alerts yet.</p>
      ) : (
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
