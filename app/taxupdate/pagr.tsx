// File: app/user/taxupdate/page.tsx
'use client';

import { useState, useEffect } from 'react';
import type { ITaxUpdate } from '@/models/taxupdate'; // Import the new interface

const DocumentIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export default function UserTaxUpdatePage() {
  const [updates, setUpdates] = useState<ITaxUpdate[]>([]); // State for tax updates
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await fetch('/user/api/taxupdate');
        if (!res.ok) throw new Error('Failed to fetch tax updates.');
        const data = await res.json();
        setUpdates(data.updates); // Set 'updates' from API response
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  const renderContent = () => {
    if (isLoading) return <div className="flex justify-center mt-16"><div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-teal-500"></div></div>;
    if (error) return <div className="mt-10 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert"><strong className="font-bold">Error: </strong><span className="block sm:inline">{error}</span></div>;
    if (updates.length > 0) {
      return (
        <div className="space-y-5">
          {updates.map((update) => (
            <div key={update._id} className="flex items-start p-5 space-x-4 bg-white border-l-4 border-teal-500 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex-shrink-0 text-teal-500 mt-1"><DocumentIcon className="w-6 h-6" /></div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-slate-800">{update.title}</h2>
                  <span className="text-xs font-medium text-slate-400">{new Date(update.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-1 text-slate-600">{update.message}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="text-center mt-16">
        <DocumentIcon className="w-16 h-16 mx-auto text-slate-300" />
        <h3 className="mt-4 text-xl font-semibold text-slate-700">No Tax Updates Available</h3>
        <p className="mt-2 text-slate-500">Official tax updates will appear here when they are posted.</p>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Tax Updates</h1>
          <p className="mt-1 text-slate-500">All your official tax-related messages.</p>
        </header>
        <main>{renderContent()}</main>
      </div>
    </div>
  );
}