'use client';

import { useState, useEffect } from 'react';

type Message = {
  _id: string;
  message: string;
};

export default function AdminExamPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch messages on load
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch('/api/admin/exam');
    const data = await res.json();
    setMessages(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/exam', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, id: editingId }),
      });

      if (!res.ok) throw new Error('Failed to save');

      setMessage('');
      setEditingId(null);
      setSuccess(true);
      fetchMessages();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  const handleEdit = (msg: Message) => {
    setMessage(msg.message);
    setEditingId(msg._id);
    setSuccess(false);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/exam?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchMessages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin - Exam Messages</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="Enter your exam message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? 'Update' : 'Send'}
        </button>

        {success && <p className="text-green-600">✅ Success!</p>}
        {error && <p className="text-red-600">❌ {error}</p>}
      </form>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="border p-4 rounded flex justify-between items-start"
          >
            <p className="flex-1 whitespace-pre-wrap">{msg.message}</p>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(msg)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(msg._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
