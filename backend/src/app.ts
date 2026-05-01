import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";
import authRoutes from "./routes/auth.routes";
import cityRoutes from "./routes/city.routes";

export const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);