const { body, validationResult } = require('express-validator');

const VALID_CATEGORIES = [
  'Food', 'Transport', 'Shopping', 'Bills',
  'Entertainment', 'Education', 'Healthcare', 'Travel', 'Other',
];

const VALID_PAYMENT_METHODS = [
  'Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Other',
];

// Validation rules for creating/updating an expense
const expenseValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 150 }).withMessage('Title must be ≤ 150 characters'),

  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),

  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(VALID_CATEGORIES).withMessage(`Category must be one of: ${VALID_CATEGORIES.join(', ')}`),

  body('expense_date')
    .trim()
    .notEmpty().withMessage('Expense date is required')
    .isDate().withMessage('Expense date must be a valid date (YYYY-MM-DD)'),

  body('payment_method')
    .trim()
    .notEmpty().withMessage('Payment method is required')
    .isIn(VALID_PAYMENT_METHODS).withMessage(`Payment method must be one of: ${VALID_PAYMENT_METHODS.join(', ')}`),

  body('description')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage('Description must be ≤ 1000 characters'),
];

// Middleware that runs after rules — sends 422 if any rule failed
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = { expenseValidationRules, validate };
