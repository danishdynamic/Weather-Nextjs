import { Request, Response } from "express";
import { fetchWeather } from "../services/weather.service";

export const getWeather = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  const data = await fetchWeather(lat , lon);
  res.json(data);
};