import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  extraInfo: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);