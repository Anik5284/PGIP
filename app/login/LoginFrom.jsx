"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/dashboard"); // or wherever you want to go after login
      } else {
        const data = await res.json();
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
