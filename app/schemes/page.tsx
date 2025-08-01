'use client';

import { useEffect, useState } from 'react';

interface Scheme {
  _id: string;
  message: string;
  createdAt: string;
}

// Reusable Icon component
const Icon = ({ path, className = "" }: { path: string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className={`w-5 h-5 shrink-0 ${className}`}
  >
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

// Skeleton loader for loading state
const SkeletonScheme = () => (
  <li className="bg-white p-5 rounded-lg shadow-sm animate-pulse">
    <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-200 rounded"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
    </div>
    <div className="h-3 bg-slate-200 rounded w-1/3 mt-4"></div>
  </li>
);

export default function UserSchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/schemes');
        if (!res.ok) throw new Error("Failed to load schemes.");
        const data = await res.json();
        const sortedData = data.sort((a: Scheme, b: Scheme) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setSchemes(sortedData);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <ul className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonScheme key={i} />)}
        </ul>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 px-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">An Error Occurred</h3>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      );
    }

    if (schemes.length === 0) {
      return (
        <div className="text-center py-16 px-6 bg-white border-2 border-dashed border-slate-300 rounded-lg">
          <Icon
            path="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003.586 15h12.828a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM8 16a2 2 0 114 0H8z"
            className="mx-auto h-12 w-12 text-slate-400"
          />
          <h3 className="mt-4 text-lg font-semibold text-slate-700">No New Schemes Available</h3>
          <p className="text-slate-500 mt-1">Please check back later for new announcements.</p>
        </div>
      );
    }

    return (
      <ul className="space-y-5">
        {schemes.map((scheme) => {
          const threeDaysAgo = new Date();
          threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
          const isNew = new Date(scheme.createdAt) > threeDaysAgo;

          return (
            <li
              key={scheme._id}
              className="relative bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              {isNew && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-md">
                  New
                </span>
              )}
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">
                  <Icon path="M10.75 8.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z M10 18a8 8 0 100-16 8 8 0 000 16z" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-500">
                    Posted:{" "}
                    {new Date(scheme.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="text-slate-900 text-base leading-relaxed font-semibold">
                {scheme.message}
              </p>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Latest Schemes</h1>
          <p className="mt-2 text-lg text-slate-600">
            Official announcements and opportunities available for you.
          </p>
        </header>
        <main>{renderContent()}</main>
      </div>
    </div>
  );
}
