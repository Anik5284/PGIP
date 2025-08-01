'use client';

import { useEffect, useState } from 'react';

interface Message {
  _id: string;
  message: string;
  sentAt: string;
}

export default function UserMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/admin/checklist');
        if (!res.ok) throw new Error('Failed to fetch messages');

        const data = await res.json();
        setMessages(data.messages);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message || 'Failed to load messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          📄 Checking Documents Updates
        </h1>

        {loading && (
          <p className="text-center text-indigo-500 text-lg">Loading messages...</p>
        )}

        {error && (
          <p className="text-center text-red-600 font-medium">❌ {error}</p>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
            No messages available.
          </div>
        )}

        <ul className="space-y-6">
          {messages.map((msg) => (
            <li
              key={msg._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 border border-gray-200"
            >
              <p className="text-gray-900 text-lg font-semibold">{msg.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                🕒 {new Date(msg.sentAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
