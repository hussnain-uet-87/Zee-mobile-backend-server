const mongoose = require("mongoose");

const ItemCostSchema = new mongoose.Schema({
  inventoryName: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ItemCost", ItemCostSchema);