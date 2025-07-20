"use client";

import { useEffect, useState } from "react";

interface Feedback {
  _id: string;
  message: string;
  userId?: string;
  createdAt: string;
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
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

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">User Feedback</h1>

      {loading ? (
        <p>Loading feedback...</p>
      ) : feedbacks.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        <ul className="space-y-4">
          {feedbacks.map((fb) => (
            <li key={fb._id} className="border p-4 rounded-md shadow-sm">
              <p className="text-gray-800">{fb.message}</p>
              <div className="text-sm text-gray-500 mt-2">
                {fb.userId && <span>User ID: {fb.userId} | </span>}
                Submitted: {new Date(fb.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
