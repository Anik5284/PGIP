"use client";

import { useState } from "react";

// A reusable Icon component for a clean and consistent icon system
const Icon = ({ path, className }: { path: string, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    aria-hidden="true"
    className={`w-5 h-5 ${className}`}
  >
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

export default function AdminAlertsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  // Using an object for status to hold both message and type (success/error)
  const [status, setStatus] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!userId.trim() || !title.trim() || !description.trim()) {
      setStatus({ message: "All fields are required to send an alert.", type: "error" });
      return;
    }

    try {
      const res = await fetch("/api/admin/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "An unknown error occurred.");
      }
      
      setStatus({ message: data.message || "Alert has been sent successfully.", type: "success" });
      setTitle("");
      setDescription("");
      setUserId("");
    } catch (err: any) {
      setStatus({ message: err.message, type: "error" });
    }
  };

  return (
    // A neutral, light gray background puts the focus on the content
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      {/* The form is contained in a clean, solid white card with a subtle border and shadow */}
      <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-xl shadow-lg border border-slate-200">
        <header className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Send Alert Notification
          </h2>
          <p className="mt-2 text-slate-600">
            Compose and dispatch a targeted notification to a specific user.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter a concise title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              id="description"
              placeholder="Enter the full message content..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              rows={4}
            />
          </div>

          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-slate-700 mb-2">Recipient User ID</label>
            <input
              id="userId"
              type="text"
              placeholder="User's unique identifier"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="block w-full border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {/* Status messages are integrated directly into the form flow */}
          {status && (
            <div
              role="alert"
              className={`p-4 rounded-md text-sm flex items-center gap-3 ${
                status.type === "success" 
                  ? "bg-green-50 text-green-800" 
                  : "bg-red-50 text-red-800"
              }`}
            >
              <Icon 
                path={status.type === 'success' ? "M9.813 15.904L9 15.09l-1.414 1.414L9 18.121l5.414-5.414L13 11.293z M10 18a8 8 0 100-16 8 8 0 000 16z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM10 12a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"} 
                className={status.type === 'success' ? "text-green-500" : "text-red-500"}
              />
              <span className="font-medium">{status.message}</span>
            </div>
          )}
          
          {/* The primary button has a solid, professional color and accessible focus states */}
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!title || !description || !userId}
          >
            <Icon path="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" className="-ml-1 mr-2"/>
            Dispatch Alert
          </button>
        </form>
      </div>
    </div>
  );
}