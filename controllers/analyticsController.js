import Sale from "../models/Sale.js";

export const getMonthlyAnalytics = async (req, res) => {
  try {
    const analytics = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalSale" },
          totalExpenses: { $sum: "$totalExpense" },
          profit: { $sum: "$profit" },
        },
      },
    ]);

    // If database is empty, return zeros instead of null
    const result = analytics[0] || {
      totalSales: 0,
      totalExpenses: 0,
      profit: 0,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate total analytics",
      error: error.message,
    });
  }
};