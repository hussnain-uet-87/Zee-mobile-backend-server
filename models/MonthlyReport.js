import mongoose from "mongoose";

const MonthlyReportSchema = new mongoose.Schema({
  monthName: { type: String, required: true }, // e.g., "January 2026"
  totalSale: { type: Number, required: true },
  itemsCostPrice: { type: Number, required: true },
  itemsPurchasedPrice: { type: Number, required: true },
  shopExpense: { type: Number, required: true },
  totalProfit: { type: Number, required: true },
  availableProfit: { type: Number, required: true },
  dateSaved: { type: Date, default: Date.now }
});

const MonthlyReport = mongoose.models.MonthlyReport || mongoose.model("MonthlyReport", MonthlyReportSchema);
export default MonthlyReport;