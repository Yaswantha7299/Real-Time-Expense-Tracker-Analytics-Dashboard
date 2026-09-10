export default function LoadingSpinner({ message = 'Loading…' }) {
  return (
    <div className="loading-wrap" role="status" aria-label={message}>
      <div className="spinner" />
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{message}</p>
    </div>
  );
}
