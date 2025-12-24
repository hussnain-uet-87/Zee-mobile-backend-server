export const getMonthlyAnalytics = async (req, res) => {
  try {
    const now = new Date();
    // Get the first day of the current month (UTC)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // Get the last day of the current month (UTC)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

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

    // Send result or defaults if no sales found for this month
    res.status(200).json(
      analytics[0] || {
        totalSales: 0,
        totalExpenses: 0,
        profit: 0,
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};