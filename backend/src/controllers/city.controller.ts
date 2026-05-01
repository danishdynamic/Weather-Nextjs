import { Request, Response } from "express";
import { query } from "../config/db";

export const getSavedCities = async (req: any, res: Response) => {
  try {
    // req.user comes from your authMiddleware (decoded JWT)
    const userId = req.user.userId;
    const result = await query("SELECT * FROM saved_cities WHERE user_id = $1", [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cities" });
  }
};

export const saveCity = async (req: any, res: Response) => {
  try {
    const { city } = req.body;
    const userId = req.user.userId;

    if (!city) return res.status(400).json({ message: "City name is required" });

    const result = await query(
      "INSERT INTO saved_cities (user_id, city) VALUES ($1, $2) RETURNING *",
      [userId, city]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error saving city" });
  }
};

export const deleteCity = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    await query("DELETE FROM saved_cities WHERE id = $1 AND user_id = $2", [id, userId]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting city" });
  }
};