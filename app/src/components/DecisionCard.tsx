import { ScenarioOption, ScenarioState } from '../game/types';

interface DecisionCardProps {
  decision: ScenarioState;
  onChoose: (option: ScenarioOption) => void;
}

export function DecisionCard({ decision, onChoose }: DecisionCardProps) {
  return (
    <section className="decision-card">
      <div className="decision-card__top">
        <p className="eyebrow">Situation card</p>
        <span className="badge">{decision.theme}</span>
      </div>
      <h2>{decision.title}</h2>
      <p className="decision-card__situation">{decision.intro}</p>
      <p className="muted">{decision.whatIsAtStake}</p>
      <div className="decision-meta">
        <span className="badge badge--soft">{decision.urgency}</span>
        <span className="badge badge--soft">{decision.affectedRegionIds.length} regions affected</span>
        <span className="badge badge--soft">{decision.affectedInstitutionIds.length} institutions involved</span>
      </div>
      <div className="decision-options">
        {decision.options.map((option) => (
          <button key={option.id} type="button" className="decision-option" onClick={() => onChoose(option)}>
            <div className="decision-option__header">
              <strong>{option.label}</strong>
              <span>{option.summary}</span>
            </div>
            <p>{option.humaneLogic}</p>
            <span className="decision-option__tradeoff">{option.likelyTradeoff}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
