import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// --- DATABASE MODEL ---
const ItemCostSchema = new mongoose.Schema({
  inventoryName: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

// Avoid re-compiling the model if it already exists
const ItemCost = mongoose.models.ItemCost || mongoose.model("ItemCost", ItemCostSchema);

// --- ROUTES / LOGIC ---

// 1. GET all items
router.get("/", async (req, res) => {
  try {
    const items = await ItemCost.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stock", error: err.message });
  }
});

// 2. POST add new stock item
router.post("/", async (req, res) => {
  try {
    const { inventoryName, price, date } = req.body;
    const newItem = new ItemCost({
      inventoryName,
      price: Number(price),
      date: date || new Date()
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: "Error saving stock item", error: err.message });
  }
});

// 3. DELETE stock record
router.delete("/:id", async (req, res) => {
  try {
    await ItemCost.findByIdAndDelete(req.params.id);
    res.json({ message: "Stock record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting record" });
  }
});

export default router;