import Sale from "../models/Sale.js";

export const getMonthlyAnalytics = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    const analytics = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalSale" },
          totalExpenses: { $sum: "$totalExpense" },
          profit: { $sum: "$profit" },
        },
      },
    ]);

    res.status(200).json(
      analytics[0] || {
        totalSales: 0,
        totalExpenses: 0,
        profit: 0,
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch monthly analytics",
      error: error.message,
    });
  }
};
