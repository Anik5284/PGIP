'use client';

import { useState } from 'react';

export default function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
    setStatus('sending');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage(''); // Clear the textarea after successful submission
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-50 font-sans p-8 rounded-2xl shadow-lg max-w-lg mx-auto border border-slate-200/80">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Share Your Feedback</h2>
      <p className="text-slate-600 mb-6">We value your opinion. Let us know how we can improve.</p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 p-4 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-300 ease-in-out"
          placeholder="Enter your feedback here..."
          required
          disabled={status === 'sending'}
        />

        <div className="mt-6 flex items-center justify-between">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Submit Feedback'}
          </button>
          
          {status === 'success' && (
            <p className="text-green-600 font-medium">Thank you for your feedback!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 font-medium">Something went wrong. Please try again.</p>
          )}
        </div>
      </form>
    </div>
  );
}
