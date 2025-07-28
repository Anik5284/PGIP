'use client';

import { useEffect, useState } from 'react';

interface Message {
  _id: string;
  message: string;
  sentAt: string;
}

export default function AdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [editMessageId, setEditMessageId] = useState<string | null>(null);
  const [editMessageText, setEditMessageText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load messages from API
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/exam');
      const data = await res.json();
      setMessages(data.messages);
    } catch (err) {
      console.error(err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Submit new message
  const handleAddMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newMessage.trim()) return;

    try {
      const res = await fetch('/api/admin/exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setNewMessage('');
      setSuccess('Message sent successfully');
      fetchMessages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Delete message
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/exam?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete message');
      fetchMessages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Start editing
  const startEdit = (id: string, message: string) => {
    setEditMessageId(id);
    setEditMessageText(message);
  };

  // Save edited message
  const saveEdit = async () => {
    try {
      const res = await fetch('/api/admin/exam', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editMessageId, message: editMessageText }),
      });

      if (!res.ok) throw new Error('Failed to update message');
      setEditMessageId(null);
      setEditMessageText('');
      fetchMessages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Exam Messages</h1>

      <form onSubmit={handleAddMessage} className="mb-6">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Enter a message to send..."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
        {success && <p className="text-green-600 mt-2">{success}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>

      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg._id} className="border p-4 rounded shadow-sm flex flex-col gap-2">
              {editMessageId === msg._id ? (
                <>
                  <textarea
                    className="w-full border p-2 rounded"
                    value={editMessageText}
                    onChange={(e) => setEditMessageText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMessageId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>{msg.message}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(msg.sentAt).toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(msg._id, msg.message)}
                      className="text-blue-600 underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="text-red-600 underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
