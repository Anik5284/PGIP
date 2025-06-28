'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // You can also use Heroicons or any other icon set

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-400 via-sky-300 to-emerald-300">
      <div className="bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/30">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-tr from-pink-500 to-violet-500 text-white rounded-full p-3 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 10h18M4 6h16M5 14h14M6 18h12" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">
            Personalized Government Info Portal
          </h1>
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-violet-700">Welcome Back</h2>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full border border-violet-200 rounded-lg p-2 bg-violet-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="mt-1 w-full border border-pink-200 rounded-lg p-2 bg-pink-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-400 pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-700">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-fuchsia-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500 text-white py-2 rounded-lg shadow-xl hover:from-fuchsia-600 hover:to-violet-600 transition-all font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-700">
          Don’t have an account?{' '}
          <Link href="/register" className="text-sky-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
