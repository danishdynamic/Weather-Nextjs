import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env"; // Make sure this points to your env config

export const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // USE THE IMPORTED SECRET
    const decoded = jwt.verify(token, JWT_SECRET); 
    req.user = decoded;
    next();
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    
    console.error("JWT Verification failed:", errorMessage);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};