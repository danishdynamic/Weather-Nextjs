import { Router } from 'express';
import { query } from '../config/db';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authMiddleware, async (req: any, res) => {
  const result = await query('SELECT * FROM saved_cities WHERE user_id = $1', [req.user.userId]);
  res.json(result.rows);
});

router.post('/', authMiddleware, async (req: any, res) => {
  const { city } = req.body;
  const result = await query(
    'INSERT INTO saved_cities (user_id, city) VALUES ($1, $2) RETURNING *',
    [req.user.userId, city]
  );
  res.status(201).json(result.rows[0]);
});

export default router;