import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_if_env_fails";
export const PORT = process.env.PORT || 5000;