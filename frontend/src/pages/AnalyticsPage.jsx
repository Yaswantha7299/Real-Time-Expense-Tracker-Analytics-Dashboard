import { useState, useEffect, useCallback } from 'react';
import { getAnalytics } from '../services/api';
import { formatCurrency, CATEGORY_COLORS, CATEGORY_EMOJI } from '../utils/formatters';
import CategoryChart from '../components/CategoryChart';
import MonthlyChart from '../components/MonthlyChart';
import LoadingSpinner from '../components/LoadingSpinner';
import StatCard from '../components/StatCard';
import { DollarSign, TrendingUp, Receipt, ArrowUp, ArrowDown } from 'lucide-react';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getAnalytics();
      setData(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingSpinner message="Loading analytics…" />;
  if (error) return (
    <div style={{ padding: 40, color: 'var(--danger)', textAlign: 'center' }}>
      <p>{error}</p>
      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={load}>Retry</button>
    </div>
  );

  const {
    total_spending, current_month_spending, transaction_count,
    highest_spending_category, lowest_spending_category,
    category_breakdown = [], monthly_breakdown = [],
  } = data || {};

  const maxCatTotal = category_breakdown[0]?.total || 1;

  return (
    <div className="page-body">
      <div className="section-header">
        <div>
          <h1 className="section-title">Analytics</h1>
          <p className="section-subtitle">Deep-dive into your spending patterns</p>
        </div>
      </div>

      {/* Top stats */}
      <div className="stat-grid" style={{ marginBottom: 'var(--sp-6)' }}>
        <StatCard
          label="Total Spending"
          value={formatCurrency(total_spending)}
          icon={DollarSign}
          accentColor="#ef4444"
          iconBg="rgba(239,68,68,0.12)"
        />
        <StatCard
          label="This Month"
          value={formatCurrency(current_month_spending)}
          icon={TrendingUp}
          accentColor="#6366f1"
          iconBg="rgba(99,102,241,0.12)"
        />
        <StatCard
          label="Transactions"
          value={transaction_count ?? 0}
          icon={Receipt}
          accentColor="#06b6d4"
          iconBg="rgba(6,182,212,0.12)"
        />
        <StatCard
          label="Highest Category"
          value={highest_spending_category?.category || '—'}
          icon={ArrowUp}
          accentColor="#f59e0b"
          iconBg="rgba(245,158,11,0.12)"
          sub={highest_spending_category ? formatCurrency(highest_spending_category.total) : ''}
        />
      </div>

      {/* Charts */}
      <div className="analytics-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Category Distribution</h3>
          </div>
          <div className="card-body" style={{ paddingTop: 8 }}>
            <CategoryChart data={category_breakdown} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Monthly Spending Trend</h3>
          </div>
          <div className="card-body" style={{ paddingTop: 8 }}>
            <MonthlyChart data={monthly_breakdown} />
          </div>
        </div>
      </div>

      {/* Category Ranking bars */}
      <div className="card" style={{ marginTop: 'var(--sp-4)' }}>
        <div className="card-header">
          <h3 className="card-title">Category Comparison</h3>
          {highest_spending_category && (
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <ArrowUp size={12} /> {highest_spending_category.category}
              </span>
              {lowest_spending_category && (
                <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ArrowDown size={12} /> {lowest_spending_category.category}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="card-body">
          {category_breakdown.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 24 }}>No data available</p>
          ) : (
            <div className="cat-rank-list">
              {category_breakdown.map(cat => (
                <div key={cat.category} className="cat-rank-item">
                  <span style={{ fontSize: 18, width: 28, textAlign: 'center', flexShrink: 0 }}>
                    {CATEGORY_EMOJI[cat.category] || '📌'}
                  </span>
                  <span className="cat-rank-name">{cat.category}</span>
                  <div className="cat-rank-bar-wrap" style={{ flex: 3 }}>
                    <div
                      className="cat-rank-bar"
                      style={{
                        width: `${Math.max(2, (cat.total / maxCatTotal) * 100)}%`,
                        background: `linear-gradient(90deg, ${CATEGORY_COLORS[cat.category] || '#6366f1'}, rgba(6,182,212,0.6))`,
                      }}
                    />
                  </div>
                  <span className="cat-rank-amount">{formatCurrency(cat.total)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
