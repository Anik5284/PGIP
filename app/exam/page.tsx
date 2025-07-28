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

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📢 Exam Announcements</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">❌ {error}</p>}

      {!loading && !error && messages.length === 0 && (
        <p className="text-gray-500">No messages yet.</p>
      )}

      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg._id} className="border p-4 rounded shadow">
            <p>{msg.message}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
