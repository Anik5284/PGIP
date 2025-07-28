'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setMessage('');
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Document Checking Meassage</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Type your message to users..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'sent' && <p className="text-green-600">Message sent successfully!</p>}
        {status === 'error' && <p className="text-red-600">Failed to send message.</p>}
      </form>
    </div>
  );
}
