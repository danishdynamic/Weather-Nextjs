"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import SearchBar from '@/components/weather/SearchBar';
import WeatherCard from '@/components/weather/WeatherCard';
import WeatherChart from '@/components/weather/WeatherChart';

interface City {
  id: number;
  city: string;
  created_at: string;
  displayTemp?: number;
  displayCondition?: string;
}

export default function DashboardPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChartData, setActiveChartData] = useState<any[]>([]);
  const [selectedCityName, setSelectedCityName] = useState<string>("");
  const router = useRouter();

  // 1. Initial Load & Auth Check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchSavedCities();
  }, [router]);

  // 2. API: Fetch Saved Cities from Backend
  const fetchSavedCities = async () => {
    try {
      const res = await api.get('/cities');
      const citiesWithData: City[] = res.data.map((c: any) => ({
        ...c,
        displayTemp: Math.floor(Math.random() * 15) + 15,
        displayCondition: "Sunny"
      }));

      setCities(citiesWithData);

      // Auto-load chart for the first city if none is selected
      if (citiesWithData.length > 0 && !selectedCityName) {
        handleViewWeather(citiesWithData[0].city);
      }
    } catch (err) {
      console.error("Failed to fetch cities", err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  // 3. API: Save a new City & immediately show its weather
  const handleAddCity = async (cityName: string) => {
    try {
      await api.post('/cities', { city: cityName });
      await fetchSavedCities(); // Refresh list to show new card
      handleViewWeather(cityName); // Trigger chart update for the new city
    } catch (err) {
      alert("Error saving city. Make sure your backend is running!");
    }
  };

  // 4. API: Delete a City
  const handleDeleteCity = async (id: number) => {
    try {
      await api.delete(`/cities/${id}`);
      setCities(prev => prev.filter(c => c.id !== id));
      // If deleted city was the one being viewed, clear the chart
      if (cities.find(c => c.id === id)?.city === selectedCityName) {
        setActiveChartData([]);
        setSelectedCityName("");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // 5. API: Fetch Weather Data for Chart
  const handleViewWeather = async (cityName: string) => {
    try {
      const res = await api.get(`/weather?city=${cityName}`);
      setActiveChartData(res.data.chartData);
      setSelectedCityName(cityName);
    } catch (err) {
      console.error("Could not fetch weather for chart");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          
          {/* Header & Search */}
          <section className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Weather Dashboard</h1>
              <p className="text-slate-400 mt-1">Welcome back! Checking the skies for your saved locations.</p>
            </div>
            <SearchBar onAddCity={handleAddCity} />
          </section>

          {/* Forecast Visualization Section */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-blue-400 font-bold uppercase text-xs tracking-widest">
                  Viewing Forecast: {selectedCityName || "Select a City"}
                </h2>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
                <WeatherChart data={activeChartData} />
              </div>
            </div>

            {/* Weather Tip Card */}
            <div className="bg-blue-600 rounded-2xl p-6 flex flex-col justify-between shadow-lg shadow-blue-900/20">
              <div>
                <h3 className="text-white/80 font-medium uppercase text-xs tracking-widest">Weather Tip</h3>
                <p className="text-white text-lg mt-2 font-semibold">
                  {selectedCityName 
                    ? `Conditions in ${selectedCityName} are looking stable for the next 24 hours.`
                    : "Select a city to see specialized travel and activity tips."}
                </p>
              </div>
              <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded-lg text-sm self-start hover:bg-blue-50 transition-colors">
                Plan Weekend
              </button>
            </div>
          </section>

          {/* Cities Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Your Locations</h2>
              <span className="text-sm text-slate-500">{cities.length} Cities Saved</span>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cities.length === 0 ? (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-2xl">
                    <p className="text-slate-500">You haven't saved any cities yet. Search above to get started!</p>
                  </div>
                ) : (
                  cities.map((city) => (
                    <WeatherCard 
                      key={city.id} 
                      city={city.city} 
                      temp={city.displayTemp} 
                      condition={city.displayCondition}
                      onViewWeather={() => handleViewWeather(city.city)}
                      onDelete={() => handleDeleteCity(city.id)}
                    />
                  ))
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}