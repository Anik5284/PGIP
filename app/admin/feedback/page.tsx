"use client";

import { useEffect, useState } from "react";

// Using a more specific interface name
interface FeedbackPost {
  _id: string;
  message: string;
  userId?: string;
  createdAt: string;
}

// A simple SVG icon component for better semantics
const Icon = ({ path }: { path: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("/api/feedback/get");
        const data = await res.json();
        setFeedbacks(data.feedbacks);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // Formatter for a cleaner date display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    // Colorful gradient background for a vibrant feel
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 font-sans">
      <main className="max-w-5xl mx-auto p-6 sm:p-10">
        <header className="mb-12 text-center">
          {/* Header text uses the new accent color */}
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 tracking-tight">
            User Feedback
          </h1>
          <p className="mt-2 text-lg text-indigo-500">
            Review and manage all submitted user feedback.
          </p>
        </header>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-indigo-500 text-lg">Loading feedback...</p>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg shadow-lg p-12">
            <h3 className="text-2xl font-semibold text-indigo-600">No Feedback Yet</h3>
            <p className="text-slate-600 mt-2">
              When users submit feedback, it will appear here.
            </p>
          </div>
        ) : (
          <ul className="space-y-8">
            {feedbacks.map((fb) => (
              <li
                key={fb._id}
                // Cards are semi-transparent for a modern "glassmorphism" effect
                className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden ring-1 ring-black ring-opacity-5"
              >
                <div className="p-6">
                  <p className="text-lg text-slate-800 leading-relaxed">
                    {fb.message}
                  </p>
                </div>

                {/* Footer uses the accent color for icons and details */}
                <div className="bg-white/50 px-6 py-4 border-t border-indigo-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {fb.userId && (
                    <div className="flex items-center gap-2 text-sm text-indigo-600">
                      <Icon path="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      <span className="font-medium">User ID:</span>
                      <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        {fb.userId}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-indigo-600">
                    <Icon path="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" />
                    <span className="font-medium">Submitted:</span>
                    <span className="text-slate-700">{formatDate(fb.createdAt)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}