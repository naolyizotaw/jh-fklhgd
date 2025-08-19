import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManagerHome() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    fetch('/api/users/me', { headers: { Authorization: `Bearer ${token}` }})
      .then(async r => { if (!r.ok) throw new Error('unauth'); return r.json(); })
      .then(data => {
        if (data.role === 'admin') return navigate('/admin/dashboard');
        if (data.role === 'user') return navigate('/user/home');
        if (data.role !== 'manager') return navigate('/login');
        setUsername(data.username || '');
        setLoading(false);
      })
      .catch(() => { localStorage.removeItem('token'); navigate('/login'); });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-fuchsia-900 to-black text-white">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-2xl border border-white/10 text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4">Manager Portal</h1>
  <p className="text-fuchsia-200 mb-6 text-sm">{loading ? 'Loading...' : `Welcome ${username || 'Manager'}. A management dashboard will appear here soon.`}</p>
        <button
          onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
          className="px-6 py-2 rounded-md bg-gradient-to-r from-fuchsia-500 to-pink-400 font-semibold shadow hover:brightness-110 transition"
        >Logout</button>
      </div>
    </div>
  );
}
