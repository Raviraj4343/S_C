const AnalyticsCard = ({ label, value }) => (
  <div className="glass-card rounded-2xl p-5">
    <p className="text-sm text-muted">{label}</p>
    <p className="mt-2 font-display text-3xl font-extrabold text-foreground">{value}</p>
  </div>
);

export default AnalyticsCard;
