"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: feedback.trim(),
          // userId: "example-user-id" // Optional: Add this if user authentication is implemented
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFeedback("");
      } else {
        alert(data.message || "Failed to submit feedback.");
      }
    } catch (error) {
      console.error("❌ Error submitting feedback:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">We value your feedback</h1>

      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          Thank you for your feedback!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700"
            >
              Your feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Let us know what you think..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      )}
    </div>
  );
}
