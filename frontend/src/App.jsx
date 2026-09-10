import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import AddExpensePage from './pages/AddExpensePage';
import EditExpensePage from './pages/EditExpensePage';
import AnalyticsPage from './pages/AnalyticsPage';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: 80 }}>
      <h2 style={{ fontSize: '3rem', color: 'var(--primary-light)' }}>404</h2>
      <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Page not found</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/add" element={<AddExpensePage />} />
          <Route path="/edit/:id" element={<EditExpensePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
