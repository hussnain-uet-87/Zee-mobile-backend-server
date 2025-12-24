import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import connectDB from "../config.js";
import salesRoutes from "../routes/sale.js";
import analyticsRoute from "../routes/analyticsRoute.js";
import loanRoutes from "../routes/loanRoutes.js";

// Ensure we load the project's .env (located in server/) even when cwd is server/api
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
const app = express();
app.use(cors({
  origin: "https://zee-server.vercel.app" ,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json())


// Routes
app.use("/api/sales", salesRoutes);
app.use("/api/analytics", analyticsRoute);
app.use("/api/loans", loanRoutes);


// connect to MongoDB
connectDB()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

