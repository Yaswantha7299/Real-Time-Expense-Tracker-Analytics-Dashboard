const Expense = require('../models/expenseModel');

// GET /api/expenses
const getAll = async (req, res, next) => {
  try {
    const { search, category, month, sortBy, order } = req.query;
    const expenses = await Expense.findAll({ search, category, month, sortBy, order });
    res.json({ success: true, count: expenses.length, data: expenses });
  } catch (err) {
    next(err);
  }
};

// GET /api/expenses/:id
const getById = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    res.json({ success: true, data: expense });
  } catch (err) {
    next(err);
  }
};

// POST /api/expenses
const create = async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({ success: true, message: 'Expense added successfully', data: expense });
  } catch (err) {
    next(err);
  }
};

// PUT /api/expenses/:id
const update = async (req, res, next) => {
  try {
    const existing = await Expense.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    const updated = await Expense.update(req.params.id, req.body);
    res.json({ success: true, message: 'Expense updated successfully', data: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/expenses/:id
const remove = async (req, res, next) => {
  try {
    const deleted = await Expense.destroy(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    res.json({ success: true, message: 'Expense deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
