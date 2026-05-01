"use client";
import { Wind, Droplets, Trash2 } from 'lucide-react';

interface WeatherCardProps {
  city: string;
  temp?: number;
  condition?: string;
  onDelete?: () => void;
  onViewWeather: () => void;
}

export default function WeatherCard({ city, temp, condition, onViewWeather, onDelete }: WeatherCardProps) {
  return (
    <div className="relative bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer">
    <div 
      onClick={onViewWeather} 
      className="cursor-pointer group relative bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-all"
      >View City Chart</div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white capitalize">{city}</h3>
          <p className="text-slate-400">{condition}</p>
        </div>
        <div className="text-4xl font-light text-blue-400">{temp}°</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <Wind size={16} /> <span>💨 12 km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets size={16} /> <span>💧 45%</span>
        </div>
      </div>

      <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-500 transition-all"
        onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}