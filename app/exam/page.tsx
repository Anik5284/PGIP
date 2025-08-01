'use client';

import { useEffect, useState } from 'react';

interface ExamMessage {
  _id: string;
  message: string;
  createdAt: string;
}

export default function UserExamPage() {
  const [messages, setMessages] = useState<ExamMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/admin/exam');
        if (!res.ok) throw new Error('Failed to fetch messages');
        const data = await res.json();
        setMessages(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          📢 Exam Announcements
        </h1>

        {loading && (
          <p className="text-center text-indigo-500 text-lg">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-600 font-medium">❌ {error}</p>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
            No announcements yet.
          </div>
        )}

        <ul className="space-y-6">
          {messages.map((msg) => (
            <li
              key={msg._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 border border-gray-200"
            >
              <p className="text-gray-800 text-lg font-semibold">{msg.message}</p>
              <p className="text-sm text-gray-500 mt-3">
                🕒 {formatDate(msg.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
