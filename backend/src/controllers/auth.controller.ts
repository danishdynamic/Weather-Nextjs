import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPw = await bcrypt.hash(password, 10);
  try {
    const result = await query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPw]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: "Username taken" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token, username: user.username });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};