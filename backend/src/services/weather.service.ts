// backend/src/services/weather.service.ts
import axios from "axios";

export const fetchWeather = async (lat: number, lon: number) => {
  const url = `https://api.open-meteo.com/v1/forecast`;
  
  const params = {
    latitude: lat,
    longitude: lon,
    current_weather: true,
    // CRITICAL: You must ask for these specific fields for the chart to work
    daily: "temperature_2m_max", 
    timezone: "auto"
  };

  const response = await axios.get(url, { params });
  return response.data;
};