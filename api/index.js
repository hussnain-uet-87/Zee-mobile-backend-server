import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config.js";
import salesRoutes from "../routes/sale.js";
import analyticsRoute from "../routes/analyticsRoute.js";
import loanRoutes from "../routes/loanRoutes.js";
import expenseRoutes from "../routes/expenseRoute.js"; 
import itemCostRoutes  from "../routes/itemCostRoutes.js";
import reportRoutes from "../routes/reportRoutes.js"; 

// Safe Dotenv loading for local and production
dotenv.config(); 
await connectDB();
const app = express();

const allowedOrigins = [
  "https://zee-frontend.vercel.app", // Your live site
  "http://localhost:5173",           // Your local dev site
  "http://localhost:3000"            // Backup for other dev ports
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
app.use(express.json());



app.get("/", (req, res) => res.send("Zee Mobile API running"));
app.use("/api/sales", salesRoutes);
app.use("/api/analytics", analyticsRoute);
app.use("/api/loans", loanRoutes);
app.use("/api/expenses", expenseRoutes); 
app.use("/api/items-cost", itemCostRoutes);
app.use("/api/reports", reportRoutes); // 2. ADD THIS


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;