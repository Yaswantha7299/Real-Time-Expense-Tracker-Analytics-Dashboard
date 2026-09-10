export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount ?? 0);

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  // dateStr is YYYY-MM-DD from MySQL
  const [year, month, day] = dateStr.split('-');
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatMonth = (monthStr) => {
  if (!monthStr) return '';
  const [year, month] = monthStr.split('-');
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
};

export const CATEGORY_EMOJI = {
  Food: '🍽️',
  Transport: '🚗',
  Shopping: '🛍️',
  Bills: '⚡',
  Entertainment: '🎬',
  Education: '📚',
  Healthcare: '🏥',
  Travel: '✈️',
  Other: '📌',
};

export const CATEGORY_COLORS = {
  Food: '#f59e0b',
  Transport: '#06b6d4',
  Shopping: '#ec4899',
  Bills: '#ef4444',
  Entertainment: '#a855f7',
  Education: '#10b981',
  Healthcare: '#818cf8',
  Travel: '#fb923c',
  Other: '#94a3b8',
};

export const CATEGORIES = [
  'Food', 'Transport', 'Shopping', 'Bills',
  'Entertainment', 'Education', 'Healthcare', 'Travel', 'Other',
];

export const PAYMENT_METHODS = [
  'Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Other',
];
