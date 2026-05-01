import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

// Endpoint: /api/auth/register
router.post("/register", register);

// Endpoint: /api/auth/login
router.post("/login", login);

export default router;