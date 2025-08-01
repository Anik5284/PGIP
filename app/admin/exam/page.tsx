"use client";

import { useState, useEffect } from "react";

type Message = {
  _id: string;
  message: string;
};

// Reusable Icon component for a clean and consistent icon system
const Icon = ({ path, className }: { path: string, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className={`w-5 h-5 ${className}`}
  >
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

export default function AdminExamPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch messages on initial load
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/exam");
      if (!res.ok) throw new Error("Could not fetch messages.");
      const data = await res.json();
      setMessages(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearStatus = () => {
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearStatus();
    if (!message.trim()) {
      setError("Message content cannot be empty.");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/admin/exam", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, id: editingId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save the message.");
      }

      setMessage("");
      setEditingId(null);
      setSuccess(true);
      fetchMessages();
      setTimeout(() => setSuccess(false), 4000); // Auto-hide success message
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  const handleEdit = (msg: Message) => {
    setMessage(msg.message);
    setEditingId(msg._id);
    clearStatus();
    document.getElementById("examMessage")?.focus(); // Focus the textarea for editing
  };
  
  const handleCancelEdit = () => {
    setMessage('');
    setEditingId(null);
    clearStatus();
  }

  const handleDelete = async (id: string) => {
    // Add confirmation dialog to prevent accidental deletion
    if (!window.confirm("Are you sure you want to permanently delete this message?")) return;
    
    try {
      const res = await fetch(`/api/admin/exam?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete the message.");
      fetchMessages(); // Refresh the list after deletion
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    // A light, neutral background puts focus on the content
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Exam Message Management
          </h1>
          <p className="mt-1 text-md text-slate-600">
            Create, update, and manage messages related to exams.
          </p>
        </header>

        {/* Form is contained in a clean, white card with a subtle shadow */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md mb-12 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="examMessage" className="block text-sm font-medium text-slate-700 mb-2">
                {editingId ? "Update Exam Message" : "New Exam Message"}
              </label>
              <textarea
                id="examMessage"
                className="block w-full border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm transition-shadow"
                rows={4}
                placeholder="Enter message content here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            {/* Styled success and error messages are integrated into the form */}
            {success && (
              <div role="alert" className="p-4 bg-green-50 text-green-800 border border-green-200 rounded-lg flex items-center gap-3">
                <Icon path="M9.813 15.904L9 15.09l-1.414 1.414L9 18.121l5.414-5.414L13 11.293z M10 18a8 8 0 100-16 8 8 0 000 16z" className="shrink-0 text-green-500"/>
                <span className="text-sm font-medium">Message saved successfully!</span>
              </div>
            )}
            {error && (
              <div role="alert" className="p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg flex items-center gap-3">
                <Icon path="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM10 12a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" className="shrink-0 text-red-500"/>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!message.trim()}
              >
                <Icon path="M10 2a1 1 0 00-1.168.825L8.5 4.5h3l-.332-1.675A1 1 0 0010 2zM3.5 5.5a1 1 0 00-1 1v10a2 2 0 002 2h10a2 2 0 002-2v-10a1 1 0 00-1-1h-11zM11 9a1 1 0 10-2 0v5a1 1 0 102 0V9z" className="-ml-1 mr-2"/>
                {editingId ? "Save Changes" : "Create Message"}
              </button>
            </div>
          </form>
        </div>

        {/* The list of existing messages with its own clear heading */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3">
            Current Messages ({messages.length})
          </h2>
          {isLoading ? (
            <div className="text-center py-10 text-slate-500">Loading messages...</div>
          ) : messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center gap-4 border border-slate-200">
                <p className="flex-1 text-slate-900 text-sm whitespace-pre-wrap">{msg.message}</p>
                <div className="flex items-center shrink-0">
                  <button onClick={() => handleEdit(msg)} title="Edit Message" className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-colors">
                    <Icon path="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z M5 14H3V6h8v2H5v6z" />
                  </button>
                  <button onClick={() => handleDelete(msg._id)} title="Delete Message" className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-md transition-colors">
                    <Icon path="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" />
                  </button>
                </div>
              </div>
            ))
          ) : (
             <div className="text-center py-10 px-4 bg-white border-dashed border-slate-300 border-2 rounded-lg">
                <p className="text-slate-500">No exam messages have been created yet.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}