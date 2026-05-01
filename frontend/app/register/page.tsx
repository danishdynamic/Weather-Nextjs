"use client";
import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      router.push('/login');
    } catch (err) {
      alert("Registration failed. Try a different username.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        <input 
          type="text" placeholder="Username" 
          className="w-full p-2 mb-4 rounded bg-slate-700 border border-slate-600 outline-none focus:border-blue-500"
          onChange={(e) => setForm({...form, username: e.target.value})}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-2 mb-6 rounded bg-slate-700 border border-slate-600 outline-none focus:border-blue-500"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition">
          Register
        </button>
        <p className="mt-4 text-sm text-center text-slate-400">
          Already have an account? <Link href="/login" className="text-blue-400">Login</Link>
        </p>
      </form>
    </div>
  );
}