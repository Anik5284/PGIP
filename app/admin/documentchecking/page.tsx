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

export default function AdminPage() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!message.trim()) {
      setError("The message cannot be empty.");
      return;
    }

    try {
      const res = await fetch("/api/admin/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send the message.");
      }

      setMessage("");
      setSuccess(true);
      // Automatically hide success message after a few seconds
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    // A neutral, light gray background puts the focus on the content
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      {/* The main content is in a solid white card with a subtle border and shadow */}
      <div className="w-full max-w-2xl bg-white p-8 md:p-10 rounded-xl shadow-lg border border-slate-200">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Broadcast Message
          </h1>
          <p className="mt-2 text-slate-600">
            Compose and send a checklist message to all active users.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            {/* Added a label for accessibility and clarity */}
            <label htmlFor="broadcastMessage" className="block text-sm font-medium text-slate-700 mb-2">
              Message Content
            </label>
            <textarea
              id="broadcastMessage"
              className="block w-full border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm transition-shadow"
              rows={5}
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          {/* Status messages are now styled alerts with icons */}
          {success && (
            <div role="alert" className="p-4 bg-green-50 text-green-800 border border-green-200 rounded-lg flex items-center gap-3">
              <Icon path="M9.813 15.904L9 15.09l-1.414 1.414L9 18.121l5.414-5.414L13 11.293z M10 18a8 8 0 100-16 8 8 0 000 16z" className="shrink-0 text-green-500"/>
              <span className="text-sm font-medium">Message sent successfully!</span>
            </div>
          )}

          {error && (
            <div role="alert" className="p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg flex items-center gap-3">
              <Icon path="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM10 12a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" className="shrink-0 text-red-500"/>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Button is right-aligned, a common pattern in professional forms */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center items-center px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!message.trim()}
            >
              <Icon path="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" className="-ml-1 mr-2"/>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}