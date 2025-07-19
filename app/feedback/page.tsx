"use client"

import { useState } from "react"

export default function FeedbackPage() {
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("User Feedback:", message)
    setSubmitted(true)
    setMessage("")
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4">We value your feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="feedback" className="block text-sm font-medium">
          Your Message
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback here..."
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {submitted && (
        <div className="mt-4 text-green-600 font-medium">
          ✅ Thank you for your feedback!
        </div>
      )}
    </div>
  )
}
