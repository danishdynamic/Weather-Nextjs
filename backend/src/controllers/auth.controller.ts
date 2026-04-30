import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const loginController = async (req: Request, res: Response) => {
  const { username } = req.body;

  // Simple validation
  if (!username || username.trim() === "") {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    // Generate a simple token (Use a real secret in production)
    const token = jwt.sign(
      { username: username }, 
      JWT_SECRET, 
      { expiresIn: "1h" }
    );

    console.log(`User ${username} logged in successfully.`);

    return res.json({ 
      token, 
      message: "Login successful" 
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during login" });
  }
};