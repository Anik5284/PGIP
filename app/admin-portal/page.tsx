"use client"; 

import { useRouter } from "next/navigation";

export default function AdminPortal() {
  const router = useRouter();

  const cards = [
    { title: "Schemes Update", color: "bg-blue-100" },
    { title: "Exam Update", color: "bg-green-100" },
    { title: "Collected Documents", color: "bg-yellow-100" },
    { title: "Alert Update", color: "bg-red-100" },
    { title: "Documents Checking", color: "bg-purple-100" },
    { title: "Feedback Received", color: "bg-pink-100" },
  ];

  const handleLogout = () => {
    // TODO: Replace with real logout logic (e.g. clear tokens, call API)
    alert("You have been logged out!");
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300"
      >
        Log Out
      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Admin Portal</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-2xl shadow-lg p-6 text-center text-gray-700 font-medium hover:scale-105 transition-transform duration-300 ${card.color}`}
          >
            {card.title}
          </div>
        ))}
      </div>
    </div>
  );
}
