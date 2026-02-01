import Sale from "../models/Sale.js";
import Expense from "../models/Expense.js"; // 1. Import your Expense model

export const getMonthlyAnalytics = async (req, res) => {
  try {
    // 2. Calculate Sales Totals
    const salesAnalytics = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalSale" },
          totalExpenses: { $sum: "$totalExpense" }, // Items Cost Price
          salesProfit: { $sum: "$profit" },
        },
      },
    ]);

    // 3. Calculate Shop Expense Totals (Rent, Bills, etc.)
    const expenseAnalytics = await Expense.aggregate([
      {
        $group: {
          _id: null,
          shopExpenses: { $sum: "$amount" },
        },
      },
    ]);

    // 4. Extract values or default to 0
    const salesData = salesAnalytics[0] || { totalSales: 0, totalExpenses: 0, salesProfit: 0 };
    const shopExpenses = expenseAnalytics[0]?.shopExpenses || 0;

    // 5. Final Calculation
    // Available Profit = (Total Sales - Item Costs) - Shop Expenses
    const finalProfit = salesData.salesProfit - shopExpenses;

    res.status(200).json({
      totalSales: salesData.totalSales,
      totalExpenses: salesData.totalExpenses, // This is Items Cost Price
      shopExpenses: shopExpenses,            // This shows in your Amber box
      profit: finalProfit,                   // This is your Green "Available Profit"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate total analytics",
      error: error.message,
    });
  }
};