'use client';

import { useEffect, useState } from 'react';

interface Feedback {
  id: number;
  message: string;
  date: string;
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      setFeedbacks(data.reverse());
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 px-4 py-12 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-12 border-b border-slate-300 pb-4">
          📬 User Feedback
        </h1>

        {feedbacks.length === 0 ? (
          <div className="text-center py-24 px-6 bg-slate-100 rounded-lg border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">
              There is no feedback to display at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out border-l-4 border-indigo-500"
              >
                <blockquote className="relative">
                  <p className="font-serif text-xl text-slate-700 leading-relaxed z-10">
                    “{fb.message}”
                  </p>
                </blockquote>
                <div className="text-right mt-6">
                  <p className="text-sm text-slate-500">
                    Submitted on:{' '}
                    <span className="font-semibold text-slate-600">
                      {new Date(fb.date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}