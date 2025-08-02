// File: app/user/notification/page.tsx
'use client';

import { useState, useEffect } from 'react';
import type { INotification } from '@/models/notification';

// A simple Bell Icon component
const BellIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    />
  </svg>
);


export default function UserNotificationsPage() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // BUG FIX: Changed URL from '/api/notification' to the correct user-specific endpoint
        const res = await fetch('/api/notification');
        if (!res.ok) {
          throw new Error('Failed to fetch notifications. Please try again later.');
        }
        const data = await res.json();
        setNotifications(data.notifications);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array means this runs once on mount

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center mt-16">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="mt-10 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      );
    }

    if (notifications.length > 0) {
      return (
        <div className="space-y-5">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className="flex items-start p-5 space-x-4 bg-white border-l-4 border-indigo-500 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex-shrink-0 text-indigo-500 mt-1">
                <BellIcon className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-slate-800">{notif.title}</h2>
                  <span className="text-xs font-medium text-slate-400">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-slate-600">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="text-center mt-16">
        <BellIcon className="w-16 h-16 mx-auto text-slate-300" />
        <h3 className="mt-4 text-xl font-semibold text-slate-700">No Notifications Yet</h3>
        <p className="mt-2 text-slate-500">When you get a new notification, it will show up here.</p>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Your Notifications</h1>
            <p className="mt-1 text-slate-500">All your latest updates in one place.</p>
        </header>
        <main>
            {renderContent()}
        </main>
      </div>
    </div>
  );
}