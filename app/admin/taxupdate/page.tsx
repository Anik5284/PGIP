// File: app/admin/taxupdate/page.tsx
'use client';

import { useState, FormEvent } from 'react';

export default function AdminTaxUpdatePage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback('');
    try {
      const res = await fetch('/api/admin/taxupdate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message }),
      });

      const data = await res.json();
      setFeedback(data.message || 'Something went wrong.');

      if (res.ok) {
        setTitle('');
        setMessage('');
      }
    } catch (error) {
      setFeedback('Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Send Tax Update</h1>
      <p className="text-slate-500 mb-6">Create and send an important tax-related message.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Update Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Update Message</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
        </div>
        <button type="submit" disabled={isLoading} className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
          {isLoading ? 'Sending...' : 'Send Tax Update'}
        </button>
      </form>
      {feedback && <p className="mt-4 text-center text-sm text-gray-600">{feedback}</p>}
    </div>
  );
}