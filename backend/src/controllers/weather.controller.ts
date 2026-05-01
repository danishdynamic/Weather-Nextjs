import { Request, Response } from "express";
import axios from "axios";

export const getWeather = async (req: Request, res: Response) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City name is required" });
  }

  try {
    // 1. Convert City Name to Lat/Lon
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city as string)}&count=1&language=en&format=json`;
    const geoRes = await axios.get(geoUrl);

    if (!geoRes.data.results || geoRes.data.results.length === 0) {
      return res.status(404).json({ message: "City not found" });
    }

    const { latitude, longitude } = geoRes.data.results[0];

    // 2. Fetch Hourly Weather Forecast
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true&forecast_days=1`;
    const weatherRes = await axios.get(weatherUrl);

    // 3. Format Data for Recharts
    // We take the first 24 entries (today's forecast)
    const chartData = weatherRes.data.hourly.time.slice(0, 24).map((time: string, index: number) => ({
      time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: weatherRes.data.hourly.temperature_2m[index]
    }));

    res.json({
      cityName: city,
      current: weatherRes.data.current_weather,
      chartData: chartData // This is what the frontend state needs
    });

  } catch (error) {
    console.error("Weather error:", error);
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
};