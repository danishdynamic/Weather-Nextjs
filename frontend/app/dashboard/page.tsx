"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Box, Typography, Stack, CircularProgress, Paper } from "@mui/material";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WeatherCard from "@/components/weather/WeatherCard";
import WeatherChart from "@/components/weather/WeatherChart";
import SearchBar from "@/components/weather/SearchBar";

// Helper for weather condition descriptions
const getWeatherDesc = (code: number) => {
  const codes: any = {
    0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
    45: "Fog", 51: "Light Drizzle", 61: "Rain", 95: "Thunderstorm"
  };
  return codes[code] || `Condition ${code}`;
};

export default function DashboardPage() {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Hydration guard for Recharts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = async (city: string) => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    setLoading(true);
    try {
      // 1. Get Coordinates
      const geo = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
      if (!geo.data.results) return alert("City not found");
      const { latitude, longitude } = geo.data.results[0];

      // 2. Get Weather from Backend
      const res = await axios.get(`http://localhost:5000/api/weather`, {
        params: { lat: latitude, lon: longitude },
        headers: { Authorization: `Bearer ${token}` }
      });

      // 3. Format Data
      const daily = res.data.daily;
      const chartData = daily.time.map((t: string, i: number) => ({
        time: new Date(t).toLocaleDateString('en-IN', { weekday: 'short' }),
        temp: daily.temperature_2m_max[i]
      }));

      setWeatherData({ current: res.data.current_weather, chart: chartData });
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 3 }}>
          {weatherData ? (
            <Stack spacing={3}>
              {/* Responsive Row for Cards */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <WeatherCard title="Temp" value={`${weatherData.current?.temperature}°C`} />
                <WeatherCard title="Wind" value={`${weatherData.current?.windspeed} km/h`} />
                <WeatherCard title="Sky" value={getWeatherDesc(weatherData.current?.weathercode)} />
              </Stack>

              {/* Forecast Chart Container */}
              <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold">7-Day Forecast</Typography>
                {isClient && <WeatherChart data={weatherData.chart} />}
              </Paper>
            </Stack>
          ) : (
            /* Empty State */
            <Paper variant="outlined" sx={{ p: 10, textAlign: 'center', bgcolor: '#fafafa' }}>
              <Typography color="text.secondary">
                Search for a city to see weather results.
              </Typography>
            </Paper>
          )}
        </Box>
      )}
    </DashboardLayout>
  );
}