import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config.js";
import salesRoutes from "./routes/sale.js";
import analyticsRoute from "./routes/analyticsRoute.js";
import loanRoutes from "./routes/loanRoutes.js";


dotenv.config();
const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL 
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

