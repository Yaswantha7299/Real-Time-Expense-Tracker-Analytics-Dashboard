import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// ─── Expenses ───────────────────────────────────────────────
export const getExpenses = (params = {}) =>
  api.get('/expenses', { params });

export const getExpenseById = (id) =>
  api.get(`/expenses/${id}`);

export const createExpense = (data) =>
  api.post('/expenses', data);

export const updateExpense = (id, data) =>
  api.put(`/expenses/${id}`, data);

export const deleteExpense = (id) =>
  api.delete(`/expenses/${id}`);

// ─── Analytics ──────────────────────────────────────────────
export const getAnalytics = () =>
  api.get('/analytics');

// ─── Response interceptor (normalized error message) ────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  },
);

export default api;
