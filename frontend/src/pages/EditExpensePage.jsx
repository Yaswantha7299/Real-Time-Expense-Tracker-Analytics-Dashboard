import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getExpenseById } from '../services/api';
import ExpenseForm from '../components/ExpenseForm';
import LoadingSpinner from '../components/LoadingSpinner';

export default function EditExpensePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getExpenseById(id);
        setData(res.data.data);
      } catch (err) {
        toast.error(err.message || 'Expense not found');
        navigate('/expenses');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  if (loading) return <LoadingSpinner message="Loading expense…" />;

  return (
    <div className="page-body">
      <div className="section-header">
        <div>
          <h1 className="section-title">Edit Expense</h1>
          <p className="section-subtitle">Update the expense details below</p>
        </div>
      </div>
      <ExpenseForm initialData={data} />
    </div>
  );
}
