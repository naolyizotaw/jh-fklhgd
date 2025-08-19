
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Login successful!");
        localStorage.setItem("token", data.token);
        // Check if admin and redirect
        try {
          const payload = JSON.parse(atob(data.token.split(".")[1]));
          if (payload.role === "admin") {
            setTimeout(() => navigate("/admin/dashboard"), 500);
          } else if (payload.role === 'manager') {
            setTimeout(() => navigate('/manager/home'), 500);
          } else if (payload.role === 'user') {
            setTimeout(() => navigate('/user/home'), 500);
          } else {
            setTimeout(() => navigate('/login'), 500);
          }
        } catch {}
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
  <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-72 h-72 bg-fuchsia-600 rounded-full blur-3xl absolute -top-10 -left-10 mix-blend-screen"></div>
        <div className="w-96 h-96 bg-indigo-700 rounded-full blur-3xl absolute bottom-0 right-0 mix-blend-screen"></div>
      </div>
      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-10 p-6">
        {/* Left panel */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-10 flex flex-col justify-center shadow-2xl border border-white/10">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-400 rounded-md flex items-center justify-center font-extrabold">F</div>
              <span className="text-2xl font-extrabold tracking-wide">FRMS</span>
            </div>
            <h1 className="text-5xl font-extrabold leading-tight">Welcome!</h1>
            <p className="mt-6 text-sm text-purple-100 leading-relaxed max-w-sm">
              Secure Role-Based Access for the FRMS platform. Log in with your administrator credentials to manage users and permissions.
            </p>
            <button type="button" className="mt-8 inline-block bg-gradient-to-r from-pink-500 to-orange-400 px-5 py-2 rounded-md text-sm font-medium shadow hover:brightness-110 transition">Learn More</button>
          </div>
        </div>
        {/* Right panel: form */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-10 shadow-2xl flex flex-col justify-center border border-white/10">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="text-red-400 text-sm bg-red-900/30 border border-red-700 px-3 py-2 rounded">{error}</div>}
            {success && <div className="text-green-300 text-sm bg-green-900/30 border border-green-700 px-3 py-2 rounded">{success}</div>}
            <div>
              <label className="block text-xs uppercase tracking-wide mb-2 text-purple-200">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/40 outline-none transition placeholder-purple-300 text-sm"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide mb-2 text-purple-200">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/40 outline-none transition placeholder-purple-300 text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-md bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500 text-white font-semibold shadow-lg hover:brightness-110 transition">Submit</button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

