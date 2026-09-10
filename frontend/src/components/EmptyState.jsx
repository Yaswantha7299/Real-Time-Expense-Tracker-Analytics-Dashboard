import { PackageSearch } from 'lucide-react';

export default function EmptyState({ title = 'No data found', message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <PackageSearch />
      </div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}
