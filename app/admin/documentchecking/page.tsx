'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/admin/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error('Failed to send');
      }

      const data = await res.json();
      console.log('Sent:', data);
      setMessage('');
      setSuccess(true);
    } catch (err: any) {
      console.error('Error:', err.message);
      setError(err.message || 'Failed to send');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin - Send Message to Users</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded p-2"
          rows={4}
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>

        {success && <p className="text-green-600">Message sent successfully!</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
