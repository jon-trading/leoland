interface ReflectionCardProps {
  reflection: string;
  leaderArchetype: string;
  changed: Array<{ label: string; delta: number }>;
}

export function ReflectionCard({ reflection, leaderArchetype, changed }: ReflectionCardProps) {
  return (
    <section className="reflection-card">
      <div className="reflection-card__top">
        <p className="eyebrow">End of turn</p>
        <span className="badge badge--soft">{leaderArchetype}</span>
      </div>
      <p className="reflection-card__body">{reflection}</p>
      <div className="reflection-card__changes">
        {changed.map((item) => (
          <div key={item.label} className={`change-pill ${item.delta >= 0 ? 'change-pill--up' : 'change-pill--down'}`}>
            <span>{item.label}</span>
            <strong>{item.delta >= 0 ? `+${item.delta}` : item.delta}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
