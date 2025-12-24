import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config.js";
import salesRoutes from "../routes/sale.js";
import analyticsRoute from "../routes/analyticsRoute.js";
import loanRoutes from "../routes/loanRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/sales", salesRoutes);
app.use("/api/analytics", analyticsRoute);
app.use("/api/loans", loanRoutes);

export default app; // 🚨 THIS IS WHAT VERCEL NEEDS
