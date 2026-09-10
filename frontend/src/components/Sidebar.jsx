import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Receipt, BarChart3, PlusCircle, X, Menu, TrendingUp,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/expenses', label: 'Expenses', icon: Receipt },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/add', label: 'Add Expense', icon: PlusCircle },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button (mobile) */}
      <button
        id="hamburger-btn"
        className="hamburger-btn"
        style={{ position: 'fixed', top: 12, left: 12, zIndex: 150 }}
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
        {/* Close on mobile */}
        <button
          style={{ position: 'absolute', top: 14, right: 14, display: 'none' }}
          className="hamburger-btn close-btn"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <TrendingUp size={20} color="#fff" />
          </div>
          <div className="sidebar-logo-text">
            <h1>ExpenseTracker</h1>
            <p>Personal Finance</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav" aria-label="Site navigation">
          <p className="nav-section-label">Navigation</p>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
              aria-label={label}
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">© 2026 ExpenseTracker</div>
      </aside>
    </>
  );
}
