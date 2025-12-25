import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config.js";
import salesRoutes from "../routes/sale.js";
import analyticsRoute from "../routes/analyticsRoute.js";
import loanRoutes from "../routes/loanRoutes.js";

// Safe Dotenv loading for local and production
dotenv.config(); 
await connectDB();
const app = express();

const corsOptions = {
  origin: "https://zee-frontend.vercel.app", // IDENTICAL to your web URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());



app.get("/", (req, res) => res.send("Zee Mobile API running"));
app.use("/api/sales", salesRoutes);
app.use("/api/analytics", analyticsRoute);
app.use("/api/loans", loanRoutes);

export default app;