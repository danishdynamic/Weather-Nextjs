import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";
import { loginController } from "./controllers/auth.controller";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);
app.post("/login", loginController);