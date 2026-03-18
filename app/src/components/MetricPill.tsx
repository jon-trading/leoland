interface MetricPillProps {
  label: string;
  value: number;
  tone?: 'good' | 'warning' | 'neutral';
}

export function MetricPill({ label, value, tone = 'neutral' }: MetricPillProps) {
  return (
    <div className={`metric-pill metric-pill--${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
