export default function StatCard({ label, value, icon: Icon, accentColor, iconBg, sub }) {
  return (
    <div
      className="stat-card"
      style={{ '--accent-color': accentColor, '--icon-bg': iconBg }}
    >
      <div className="stat-card-icon">
        <Icon />
      </div>
      <div>
        <p className="stat-card-label">{label}</p>
        <p className="stat-card-value">{value}</p>
        {sub && <p className="stat-card-sub">{sub}</p>}
      </div>
    </div>
  );
}
