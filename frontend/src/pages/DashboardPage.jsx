import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign, TrendingUp, Receipt, Tag, PlusCircle,
} from 'lucide-react';
import { getExpenses, getAnalytics } from '../services/api';
import { formatCurrency, formatDate, CATEGORY_EMOJI } from '../utils/formatters';
import StatCard from '../components/StatCard';
import CategoryChart from '../components/CategoryChart';
import MonthlyChart from '../components/MonthlyChart';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getAnalytics();
      setAnalytics(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingSpinner message="Loading dashboard…" />;
  if (error) return (
    <div style={{ padding: 40, color: 'var(--danger)', textAlign: 'center' }}>
      <p>Failed to load dashboard: {error}</p>
      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={load}>Retry</button>
    </div>
  );

  const {
    total_spending, current_month_spending, transaction_count,
    highest_spending_category, category_breakdown, monthly_breakdown,
    recent_transactions,
  } = analytics || {};

  return (
    <div className="page-body">
      {/* Quick action */}
      <div className="section-header">
        <div>
          <h1 className="section-title">Overview</h1>
          <p className="section-subtitle">Your financial snapshot at a glance</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/add')}>
          <PlusCircle size={16} /> Add Expense
        </button>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <StatCard
          label="Total Spending"
          value={formatCurrency(total_spending)}
          icon={DollarSign}
          accentColor="#ef4444"
          iconBg="rgba(239,68,68,0.12)"
          sub="All time"
        />
        <StatCard
          label="This Month"
          value={formatCurrency(current_month_spending)}
          icon={TrendingUp}
          accentColor="#6366f1"
          iconBg="rgba(99,102,241,0.12)"
          sub="Current month"
        />
        <StatCard
          label="Transactions"
          value={transaction_count ?? 0}
          icon={Receipt}
          accentColor="#06b6d4"
          iconBg="rgba(6,182,212,0.12)"
          sub="Total entries"
        />
        <StatCard
          label="Top Category"
          value={highest_spending_category?.category || '—'}
          icon={Tag}
          accentColor="#f59e0b"
          iconBg="rgba(245,158,11,0.12)"
          sub={highest_spending_category ? formatCurrency(highest_spending_category.total) : ''}
        />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Spending by Category</h3>
          </div>
          <div className="card-body" style={{ paddingTop: 8 }}>
            <CategoryChart data={category_breakdown} />
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Monthly Spending (Last 12 Months)</h3>
          </div>
          <div className="card-body" style={{ paddingTop: 8 }}>
            <MonthlyChart data={monthly_breakdown} />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Transactions</h3>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/expenses')}>
            View All
          </button>
        </div>
        {!recent_transactions?.length ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>
            No transactions yet
          </div>
        ) : (
          <div className="tx-list">
            {recent_transactions.map(tx => (
              <div key={tx.id} className="tx-item">
                <div className={`tx-icon badge-${tx.category}`} style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  fontSize: 18,
                }}>
                  {CATEGORY_EMOJI[tx.category] || '📌'}
                </div>
                <div className="tx-info">
                  <p className="tx-title">{tx.title}</p>
                  <p className="tx-meta">{formatDate(tx.expense_date)} · {tx.category} · {tx.payment_method}</p>
                </div>
                <p className="tx-amount">{formatCurrency(tx.amount)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
