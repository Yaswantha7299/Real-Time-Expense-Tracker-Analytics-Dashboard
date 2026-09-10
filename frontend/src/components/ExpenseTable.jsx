import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Edit2, Trash2, ChevronUp, ChevronDown, Search } from 'lucide-react';
import { deleteExpense } from '../services/api';
import { formatCurrency, formatDate, CATEGORIES } from '../utils/formatters';
import ConfirmDialog from './ConfirmDialog';
import EmptyState from './EmptyState';

const ITEMS_PER_PAGE = 10;

export default function ExpenseTable({ expenses = [], onRefresh }) {
  const navigate = useNavigate();

  // Filter / search state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [month, setMonth] = useState('');
  const [sortBy, setSortBy] = useState('expense_date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
    setPage(1);
  };

  // Client-side filter + sort (data already fetched from API)
  const filtered = expenses
    .filter(e => {
      const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || e.category === category;
      const matchMonth = !month || e.expense_date?.startsWith(month);
      return matchSearch && matchCat && matchMonth;
    })
    .sort((a, b) => {
      let va = a[sortBy], vb = b[sortBy];
      if (sortBy === 'amount') { va = Number(va); vb = Number(vb); }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return null;
    return sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />;
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteExpense(deleteTarget.id);
      toast.success('Expense deleted');
      onRefresh?.();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="filter-bar">
        <div className="search-wrap">
          <Search />
          <input
            id="expense-search"
            type="text"
            className="form-control search-input"
            placeholder="Search by title…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            aria-label="Search expenses"
          />
        </div>

        <select
          id="filter-category"
          className="form-control"
          style={{ width: 'auto', minWidth: 150 }}
          value={category}
          onChange={e => { setCategory(e.target.value); setPage(1); }}
          aria-label="Filter by category"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <input
          id="filter-month"
          type="month"
          className="form-control"
          style={{ width: 'auto' }}
          value={month}
          onChange={e => { setMonth(e.target.value); setPage(1); }}
          aria-label="Filter by month"
        />

        {(search || category !== 'All' || month) && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { setSearch(''); setCategory('All'); setMonth(''); setPage(1); }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      {paged.length === 0 ? (
        <EmptyState
          title="No expenses found"
          message={search || category !== 'All' || month ? 'Try adjusting your filters' : 'Add your first expense to get started'}
          action={
            !search && category === 'All' && !month && (
              <button className="btn btn-primary" onClick={() => navigate('/add')}>Add Expense</button>
            )
          }
        />
      ) : (
        <>
          <div className="table-wrapper">
            <table aria-label="Expenses table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="sortable" onClick={() => handleSort('title')}>
                    Title <SortIcon col="title" />
                  </th>
                  <th>Category</th>
                  <th className="sortable" onClick={() => handleSort('expense_date')}>
                    Date <SortIcon col="expense_date" />
                  </th>
                  <th className="sortable" onClick={() => handleSort('amount')}>
                    Amount <SortIcon col="amount" />
                  </th>
                  <th>Payment</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map(exp => (
                  <tr key={exp.id}>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{exp.id}</td>
                    <td style={{ fontWeight: 600 }}>{exp.title}</td>
                    <td>
                      <span className={`badge badge-${exp.category}`}>{exp.category}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {formatDate(exp.expense_date)}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--danger)', whiteSpace: 'nowrap' }}>
                      {formatCurrency(exp.amount)}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{exp.payment_method}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 12, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {exp.description || '—'}
                    </td>
                    <td>
                      <div className="td-actions">
                        <button
                          className="btn btn-edit btn-sm"
                          onClick={() => navigate(`/edit/${exp.id}`)}
                          aria-label={`Edit ${exp.title}`}
                        >
                          <Edit2 size={13} /> Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteTarget(exp)}
                          aria-label={`Delete ${exp.title}`}
                        >
                          <Trash2 size={13} /> Del
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <span>
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} records
            </span>
            <div className="pagination-btns">
              <button
                className="pagination-btn"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                aria-label="Previous page"
              >
                &lsaquo;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                Math.max(0, page - 3), Math.min(totalPages, page + 2)
              ).map(p => (
                <button
                  key={p}
                  className={`pagination-btn ${p === page ? 'active' : ''}`}
                  onClick={() => setPage(p)}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? 'page' : undefined}
                >
                  {p}
                </button>
              ))}
              <button
                className="pagination-btn"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                aria-label="Next page"
              >
                &rsaquo;
              </button>
            </div>
          </div>
        </>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete Expense"
          message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </>
  );
}
