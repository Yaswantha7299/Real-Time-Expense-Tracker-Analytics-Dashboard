import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Save, X } from 'lucide-react';
import { createExpense, updateExpense } from '../services/api';
import { CATEGORIES, PAYMENT_METHODS } from '../utils/formatters';

const INITIAL_STATE = {
  title: '', amount: '', category: '', expense_date: '',
  payment_method: '', description: '',
};

export default function ExpenseForm({ initialData, onSuccess }) {
  const navigate = useNavigate();
  const isEdit = Boolean(initialData?.id);

  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        amount: initialData.amount || '',
        category: initialData.category || '',
        expense_date: initialData.expense_date || '',
        payment_method: initialData.payment_method || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.amount) errs.amount = 'Amount is required';
    else if (Number(form.amount) <= 0) errs.amount = 'Amount must be positive';
    if (!form.category) errs.category = 'Category is required';
    if (!form.expense_date) errs.expense_date = 'Date is required';
    if (!form.payment_method) errs.payment_method = 'Payment method is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => { const n = { ...e }; delete n[name]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      if (isEdit) {
        await updateExpense(initialData.id, form);
        toast.success('Expense updated successfully!');
      } else {
        await createExpense(form);
        toast.success('Expense added successfully!');
      }
      onSuccess?.();
      navigate('/expenses');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Today's date as YYYY-MM-DD default max
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="card form-page-card">
        <div className="card-header">
          <h3 className="card-title">{isEdit ? 'Edit Expense' : 'New Expense'}</h3>
        </div>
        <div className="card-body">
          <div className="form-grid">
            {/* Title */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="title">Expense Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                className={`form-control ${errors.title ? 'error' : ''}`}
                placeholder="e.g. Grocery Shopping"
                value={form.title}
                onChange={handleChange}
                maxLength={150}
              />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>

            {/* Amount */}
            <div className="form-group">
              <label htmlFor="amount">Amount (₹) *</label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                className={`form-control ${errors.amount ? 'error' : ''}`}
                placeholder="0.00"
                value={form.amount}
                onChange={handleChange}
              />
              {errors.amount && <p className="form-error">{errors.amount}</p>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                className={`form-control ${errors.category ? 'error' : ''}`}
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="form-error">{errors.category}</p>}
            </div>

            {/* Date */}
            <div className="form-group">
              <label htmlFor="expense_date">Date *</label>
              <input
                id="expense_date"
                name="expense_date"
                type="date"
                max={today}
                className={`form-control ${errors.expense_date ? 'error' : ''}`}
                value={form.expense_date}
                onChange={handleChange}
              />
              {errors.expense_date && <p className="form-error">{errors.expense_date}</p>}
            </div>

            {/* Payment method */}
            <div className="form-group">
              <label htmlFor="payment_method">Payment Method *</label>
              <select
                id="payment_method"
                name="payment_method"
                className={`form-control ${errors.payment_method ? 'error' : ''}`}
                value={form.payment_method}
                onChange={handleChange}
              >
                <option value="">Select method</option>
                {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              {errors.payment_method && <p className="form-error">{errors.payment_method}</p>}
            </div>

            {/* Description */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="description">Notes / Description</label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="form-control"
                placeholder="Optional notes…"
                value={form.description}
                onChange={handleChange}
                maxLength={1000}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              <X size={16} /> Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              <Save size={16} />
              {loading ? (isEdit ? 'Saving…' : 'Adding…') : (isEdit ? 'Save Changes' : 'Add Expense')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
