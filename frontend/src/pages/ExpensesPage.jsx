import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { getExpenses } from '../services/api';
import ExpenseTable from '../components/ExpenseTable';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function ExpensesPage() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getExpenses();
      setExpenses(res.data.data);
    } catch (err) {
      toast.error(err.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="page-body">
      <div className="section-header">
        <div>
          <h1 className="section-title">All Expenses</h1>
          <p className="section-subtitle">{expenses.length} total transaction{expenses.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/add')}>
          <PlusCircle size={16} /> Add Expense
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading expenses…" />
      ) : (
        <ExpenseTable expenses={expenses} onRefresh={load} />
      )}
    </div>
  );
}
