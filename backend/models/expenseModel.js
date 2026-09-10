const db = require('../config/db');

// ─── READ ────────────────────────────────────────────────────────────────────

const findAll = async ({ search, category, month, sortBy, order } = {}) => {
  let sql = `
    SELECT id, title, amount, category, expense_date,
           payment_method, description, created_at, updated_at
    FROM expenses
    WHERE 1=1
  `;
  const params = [];

  if (search) {
    sql += ' AND title LIKE ?';
    params.push(`%${search}%`);
  }
  if (category && category !== 'All') {
    sql += ' AND category = ?';
    params.push(category);
  }
  if (month) {
    // month format: YYYY-MM
    sql += ' AND DATE_FORMAT(expense_date, "%Y-%m") = ?';
    params.push(month);
  }

  const validSortColumns = { date: 'expense_date', amount: 'amount', title: 'title' };
  const sortColumn = validSortColumns[sortBy] || 'expense_date';
  const sortOrder = order && order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  sql += ` ORDER BY ${sortColumn} ${sortOrder}`;

  const [rows] = await db.execute(sql, params);
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.execute(
    `SELECT id, title, amount, category, expense_date,
            payment_method, description, created_at, updated_at
     FROM expenses WHERE id = ?`,
    [id],
  );
  return rows[0] || null;
};

// ─── CREATE ──────────────────────────────────────────────────────────────────

const create = async ({ title, amount, category, expense_date, payment_method, description }) => {
  const [result] = await db.execute(
    `INSERT INTO expenses (title, amount, category, expense_date, payment_method, description)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title.trim(), parseFloat(amount), category, expense_date, payment_method, description || null],
  );
  return findById(result.insertId);
};

// ─── UPDATE ──────────────────────────────────────────────────────────────────

const update = async (id, { title, amount, category, expense_date, payment_method, description }) => {
  await db.execute(
    `UPDATE expenses
     SET title = ?, amount = ?, category = ?, expense_date = ?,
         payment_method = ?, description = ?
     WHERE id = ?`,
    [title.trim(), parseFloat(amount), category, expense_date, payment_method, description || null, id],
  );
  return findById(id);
};

// ─── DELETE ──────────────────────────────────────────────────────────────────

const destroy = async (id) => {
  const [result] = await db.execute('DELETE FROM expenses WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

// ─── ANALYTICS ───────────────────────────────────────────────────────────────

const getAnalyticsData = async () => {
  // Total spending & transaction count
  const [[totals]] = await db.execute(
    `SELECT
       COALESCE(SUM(amount), 0)  AS total_spending,
       COUNT(*)                   AS transaction_count
     FROM expenses`,
  );

  // Current month spending
  const [[monthlyTotal]] = await db.execute(
    `SELECT COALESCE(SUM(amount), 0) AS current_month_spending
     FROM expenses
     WHERE DATE_FORMAT(expense_date, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')`,
  );

  // Category breakdown
  const [categoryBreakdown] = await db.execute(
    `SELECT category, COALESCE(SUM(amount), 0) AS total
     FROM expenses
     GROUP BY category
     ORDER BY total DESC`,
  );

  // Monthly breakdown (last 12 months)
  const [monthlyBreakdown] = await db.execute(
    `SELECT
       DATE_FORMAT(expense_date, '%Y-%m')  AS month,
       COALESCE(SUM(amount), 0)            AS total
     FROM expenses
     WHERE expense_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
     GROUP BY month
     ORDER BY month ASC`,
  );

  // Highest spending category
  const [[topCategory]] = await db.execute(
    `SELECT category, COALESCE(SUM(amount), 0) AS total
     FROM expenses
     GROUP BY category
     ORDER BY total DESC
     LIMIT 1`,
  );

  // Lowest spending category (among categories that have at least one expense)
  const [[lowCategory]] = await db.execute(
    `SELECT category, COALESCE(SUM(amount), 0) AS total
     FROM expenses
     GROUP BY category
     ORDER BY total ASC
     LIMIT 1`,
  );

  // Recent transactions (latest 5)
  const [recentTransactions] = await db.execute(
    `SELECT id, title, amount, category, expense_date, payment_method
     FROM expenses
     ORDER BY expense_date DESC, created_at DESC
     LIMIT 5`,
  );

  return {
    total_spending: parseFloat(totals.total_spending),
    transaction_count: parseInt(totals.transaction_count, 10),
    current_month_spending: parseFloat(monthlyTotal.current_month_spending),
    highest_spending_category: topCategory || null,
    lowest_spending_category: lowCategory || null,
    category_breakdown: categoryBreakdown.map(r => ({ ...r, total: parseFloat(r.total) })),
    monthly_breakdown: monthlyBreakdown.map(r => ({ ...r, total: parseFloat(r.total) })),
    recent_transactions: recentTransactions.map(r => ({ ...r, amount: parseFloat(r.amount) })),
  };
};

module.exports = { findAll, findById, create, update, destroy, getAnalyticsData };
