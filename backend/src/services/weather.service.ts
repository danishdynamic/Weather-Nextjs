import axios from 'axios';

export const getWeatherData = async (lat: number, lon: number) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const response = await axios.get(url);
  return response.data;
};