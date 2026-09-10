import { useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const PAGE_TITLES = {
  '/': { title: 'Dashboard', subtitle: 'Track your spending at a glance' },
  '/expenses': { title: 'Expenses', subtitle: 'Manage all your transactions' },
  '/add': { title: 'Add Expense', subtitle: 'Record a new expense' },
  '/analytics': { title: 'Analytics', subtitle: 'Deep-dive into your spending' },
};

export default function Header() {
  const { pathname } = useLocation();
  // match edit route
  const key = pathname.startsWith('/edit') ? '/expenses' : pathname;
  const { title, subtitle } = PAGE_TITLES[key] || { title: 'ExpenseTracker', subtitle: '' };

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: '2-digit', month: 'long', year: 'numeric',
  });

  return (
    <header className="page-header" role="banner">
      {/* spacer for hamburger on mobile */}
      <div style={{ width: 40, flexShrink: 0 }} aria-hidden="true" className="mob-spacer" />
      <div>
        <h2>{title}</h2>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>
          {subtitle}
        </p>
      </div>
      <div className="header-subtitle" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{today}</span>
      </div>
    </header>
  );
}
