import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define Model inside the route file for simplicity
const MonthlyReportSchema = new mongoose.Schema({
  monthName: String,
  totalSale: Number,
  itemsCostPrice: Number,
  itemsPurchasedPrice: Number,
  shopExpense: Number,
  totalProfit: Number,
  availableProfit: Number,
  dateSaved: { type: Date, default: Date.now }
});

const MonthlyReport = mongoose.models.MonthlyReport || mongoose.model("MonthlyReport", MonthlyReportSchema);

// GET Reports
router.get("/", async (req, res) => {
  try {
    const reports = await MonthlyReport.find().sort({ dateSaved: -1 });
    res.json(reports);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST Report
router.post("/", async (req, res) => {
  try {
    const newReport = new MonthlyReport(req.body);
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// DELETE Report
router.delete("/:id", async (req, res) => {
  try {
    await MonthlyReport.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;