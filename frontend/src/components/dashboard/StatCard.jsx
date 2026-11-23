export default function StatCard({ label, value, icon: Icon }) {
  return;
  <article className="stat-card">
    <span className="stat-icon">
      <Icon size={19} />
    </span>
    <div>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  </article>;
}
