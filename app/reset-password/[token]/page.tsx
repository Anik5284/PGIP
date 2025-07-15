'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetPassword({ params }: { params: { token: string } }) {
  const router = useRouter()
  const [validToken, setValidToken] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState(false)

  // ✅ Token verification
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('/api/verifytoken', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: params.token }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || 'Invalid token')
        }

        setValidToken(true)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [params.token])

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: params.token, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Reset failed')
      }

      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    }
  }

  // ✅ UI rendering
  if (loading) {
    return <div className="text-center mt-20 text-gray-600">Verifying token...</div>
  }

  if (!validToken) {
    return <div className="text-center mt-20 text-red-500">{error || 'Invalid or expired token.'}</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md text-center">
        {success ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Password Reset Successful</h1>
            <p className="text-gray-600 mb-6">Redirecting to login...</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
