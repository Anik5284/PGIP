"use client";


import { Bell } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const alerts = [
  {
    id: 1,
    title: "Aadhaar Linking Deadline",
    description:
      "Link your Aadhaar with your PAN card by July 31st to avoid penalties.",
    date: "2025-07-18",
    type: "warning",
  },
  {
    id: 3,
    title: "Scholarship Application Ending Soon",
    description:
      "Last date to apply for National Scholarship Portal is July 25th.",
    date: "2025-07-15",
    type: "urgent",
  },
];

const getAlertColor = (type: string) => {
  switch (type) {
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "info":
      return "bg-blue-100 text-blue-800";
    case "urgent":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ImportantAlertsPage() {
  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Bell className="h-7 w-7 text-red-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">
            Important Alerts
          </h1>
        </div>

        <div className="space-y-6">
          {alerts.map((alert) => (
            <Card key={alert.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {alert.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {alert.description}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${getAlertColor(
                      alert.type
                    )}`}
                  >
                    {alert.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Posted on: {alert.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
