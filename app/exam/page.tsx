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
        const res = await fetch('/api/admin/exam');

        if (!res.ok) {
          throw new Error('Failed to fetch messages');
        }

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
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Exam Updates </h1>

      {loading && <p>Loading messages...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && messages.length === 0 && (
        <p>No messages available.</p>
      )}

      {!loading && messages.length > 0 && (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg._id} className="border p-4 rounded shadow-sm">
              <p>{msg.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(msg.sentAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
