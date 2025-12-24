import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config.js";
import salesRoutes from "../routes/sale.js";
import analyticsRoute from "../routes/analyticsRoute.js";
import loanRoutes from "../routes/loanRoutes.js";

dotenv.config();

const app = express();
const corsOptions = {
  origin: "https://zee-frontend.vercel.app/", // 🚨 Replace with your REAL frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();
app.get("/", (req, res) => res.send("API running"));
app.use("/api/sales", salesRoutes);
app.use("/api/analytics", analyticsRoute);
app.use("/api/loans", loanRoutes);

export default app; // 🚨 THIS IS WHAT VERCEL NEEDS
