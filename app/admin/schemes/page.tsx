'use client';

import { useState, useEffect } from 'react';

type Scheme = {
  _id: string;
  message: string;
};

export default function AdminSchemesPage() {
  const [message, setMessage] = useState('');
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch schemes on load
  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    const res = await fetch('/api/admin/schemes');
    const data = await res.json();
    setSchemes(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/schemes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, id: editingId }),
      });

      if (!res.ok) throw new Error('Failed to save');

      setMessage('');
      setEditingId(null);
      setSuccess(true);
      fetchSchemes();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  const handleEdit = (scheme: Scheme) => {
    setMessage(scheme.message);
    setEditingId(scheme._id);
    setSuccess(false);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/schemes?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchSchemes();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin - Scheme Messages</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="Enter a scheme message..."
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
        {schemes.map((scheme) => (
          <div
            key={scheme._id}
            className="border p-4 rounded flex justify-between items-start"
          >
            <p className="flex-1 whitespace-pre-wrap">{scheme.message}</p>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(scheme)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(scheme._id)}
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
