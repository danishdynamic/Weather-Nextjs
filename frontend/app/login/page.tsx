"use client";
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input 
          type="text" placeholder="Username" 
          className="w-full p-2 mb-4 rounded bg-slate-700 border border-slate-600"
          onChange={(e) => setForm({...form, username: e.target.value})}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-2 mb-6 rounded bg-slate-700 border border-slate-600"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold transition">
          Login
        </button>
      </form>
    </div>
  );
}