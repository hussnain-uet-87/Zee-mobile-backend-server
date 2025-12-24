import Sale from "../models/Sale.js";
import express from "express";
const router = express.Router();

// GET all sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new sale
router.post("/", async (req, res) => {
  const { date, totalSale, totalExpense, profit } = req.body;
  try {
    const newSale = new Sale({ date, totalSale, totalExpense, profit });
    const saved = await newSale.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a sale
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully", sale: deleted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

