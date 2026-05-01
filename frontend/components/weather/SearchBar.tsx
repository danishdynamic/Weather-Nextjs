"use client";
import { Search, Plus } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onAddCity: (city: string) => void;
}

export default function SearchBar({ onAddCity }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleAction = () => {
    if (!input.trim()) return;
    onAddCity(input);
    setInput('');
  };

  return (
    <div className="relative flex w-full max-w-2xl gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a city..."
          className="w-full bg-slate-900 border border-slate-800 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>
      <button 
        onClick={handleAction}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20"
      >
        <Plus size={20} />
        <span className="hidden sm:inline">Add City</span>
      </button>
    </div>
  );
}