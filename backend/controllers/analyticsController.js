const Expense = require('../models/expenseModel');

// GET /api/analytics
const getAnalytics = async (req, res, next) => {
  try {
    const data = await Expense.getAnalyticsData();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAnalytics };
