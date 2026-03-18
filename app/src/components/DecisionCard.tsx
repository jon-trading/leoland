import { DecisionCard as Decision, DecisionOption } from '../game/types';

interface DecisionCardProps {
  decision: Decision;
  onChoose: (option: DecisionOption) => void;
}

export function DecisionCard({ decision, onChoose }: DecisionCardProps) {
  return (
    <section className="decision-card">
      <div className="decision-card__top">
        <p className="eyebrow">Situation card</p>
        <span className="badge">{decision.theme}</span>
      </div>
      <h2>{decision.title}</h2>
      <p className="decision-card__situation">{decision.situation}</p>
      <p className="muted">{decision.whyItMatters}</p>
      <div className="decision-options">
        {decision.options.map((option) => (
          <button key={option.id} type="button" className="decision-option" onClick={() => onChoose(option)}>
            <div className="decision-option__header">
              <strong>{option.label}</strong>
              <span>{option.summary}</span>
            </div>
            <p>{option.humaneLogic}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
