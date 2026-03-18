import { useMemo, useState } from 'react';
import { DecisionCard } from './components/DecisionCard';
import { MapCard } from './components/MapCard';
import { MetricPill } from './components/MetricPill';
import { ReflectionCard } from './components/ReflectionCard';
import { decisions, initialState } from './game/data';
import { DecisionOption, ExperienceState, MetricKey, RegionSnapshot } from './game/types';

type ScreenKey = 'home' | 'region' | 'decision' | 'reflection';

const primaryMetrics: Array<{ key: MetricKey; label: string }> = [
  { key: 'happiness', label: 'Happiness' },
  { key: 'health', label: 'Health' },
  { key: 'safety', label: 'Safety' },
  { key: 'fairness', label: 'Fairness' },
  { key: 'prosperity', label: 'Prosperity' },
  { key: 'trust', label: 'Trust' },
  { key: 'resilience', label: 'Resilience' },
  { key: 'stress', label: 'Stress' },
  { key: 'fragility', label: 'Fragility' },
];

function cloneState(): ExperienceState {
  return JSON.parse(JSON.stringify(initialState)) as ExperienceState;
}

export default function App() {
  const [screen, setScreen] = useState<ScreenKey>('home');
  const [state, setState] = useState<ExperienceState>(cloneState);
  const [lastReflection, setLastReflection] = useState('Choose a humane response and see what sort of leader you are becoming.');
  const [lastDelta, setLastDelta] = useState<Array<{ label: string; delta: number }>>([]);

  const currentDecision = decisions[state.currentDecisionIndex] ?? decisions[decisions.length - 1];
  const selectedRegion = state.regions.find((region) => region.id === state.selectedRegionId) ?? state.regions[0];
  const leaderArchetype = useMemo(() => describeLeader(state.metrics), [state.metrics]);

  function selectRegion(regionId: string) {
    setState((current) => ({ ...current, selectedRegionId: regionId }));
    setScreen('region');
  }

  function chooseOption(option: DecisionOption) {
    setState((current) => {
      const next = cloneStateFrom(current);
      const changed: Array<{ label: string; delta: number }> = [];

      Object.entries(option.metricEffects).forEach(([key, delta]) => {
        if (typeof delta !== 'number') return;
        next.metrics[key as MetricKey] = clamp(next.metrics[key as MetricKey] + delta);
        changed.push({ label: labelForMetric(key as MetricKey), delta });
      });

      option.regionEffects?.forEach((effect) => {
        const region = next.regions.find((entry) => entry.id === effect.regionId);
        if (!region) return;
        if (typeof effect.trust === 'number') region.metrics.trust = clamp(region.metrics.trust + effect.trust);
        if (typeof effect.wellbeing === 'number') region.metrics.wellbeing = clamp(region.metrics.wellbeing + effect.wellbeing);
        if (typeof effect.pressure === 'number') region.metrics.pressure = clamp(region.metrics.pressure + effect.pressure);
      });

      next.history.push({
        decisionId: currentDecision.id,
        decisionTitle: currentDecision.title,
        optionLabel: option.label,
        reflection: option.reflection,
      });
      next.currentDecisionIndex = Math.min(current.currentDecisionIndex + 1, decisions.length - 1);
      setLastReflection(option.reflection);
      setLastDelta(changed.slice(0, 5));
      return next;
    });

    setScreen('reflection');
  }

  return (
    <div className="mobile-scene">
      <div className="mobile-shell">
        <header className="hero-card">
          <div>
            <p className="eyebrow">Leoland</p>
            <h1>A country worth caring about</h1>
            <p className="hero-copy">
              Lead with fairness, practical wisdom, and long-term care. In Leoland, kindness is not softness. It is what keeps a whole society standing.
            </p>
          </div>
          <div className="hero-badges">
            <span className="badge">Phone-first</span>
            <span className="badge badge--soft">Hopeful civic strategy</span>
          </div>
        </header>

        <section className="wellbeing-grid">
          {primaryMetrics.map((metric) => (
            <MetricPill
              key={metric.key}
              label={metric.label}
              value={state.metrics[metric.key]}
              tone={metric.key === 'stress' || metric.key === 'fragility' ? 'warning' : 'good'}
            />
          ))}
        </section>

        {screen === 'home' && (
          <>
            <MapCard regions={state.regions} selectedRegionId={state.selectedRegionId} onSelectRegion={selectRegion} />
            <section className="panel-grid">
              <section className="panel">
                <p className="eyebrow">Current national question</p>
                <h2>{currentDecision.title}</h2>
                <p>{currentDecision.situation}</p>
                <button className="primary-button" type="button" onClick={() => setScreen('decision')}>
                  Consider response
                </button>
              </section>
              <section className="panel panel--accent">
                <p className="eyebrow">What success means</p>
                <h2>{leaderArchetype}</h2>
                <p>Balanced public wellbeing beats faction victory. A good turn improves life without hollowing out trust somewhere else.</p>
              </section>
            </section>
          </>
        )}

        {screen === 'region' && <RegionView region={selectedRegion} onBack={() => setScreen('home')} onDecision={() => setScreen('decision')} />}
        {screen === 'decision' && <DecisionCard decision={currentDecision} onChoose={chooseOption} />}
        {screen === 'reflection' && (
          <>
            <ReflectionCard reflection={lastReflection} leaderArchetype={leaderArchetype} changed={lastDelta} />
            <section className="panel-grid">
              <section className="panel">
                <p className="eyebrow">Who is still under pressure</p>
                <ul className="pressure-list">
                  {topPressure(state.regions).map((region) => (
                    <li key={region.id}>
                      <strong>{region.name}</strong>
                      <span>{region.currentPressure}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="panel panel--accent">
                <p className="eyebrow">Next move</p>
                <p>Return to the country view, check who benefited, and choose the next response without forgetting the places still carrying strain.</p>
                <button className="primary-button" type="button" onClick={() => setScreen('home')}>
                  Back to country
                </button>
              </section>
            </section>
          </>
        )}

        <nav className="bottom-nav">
          <button className={screen === 'home' ? 'active' : ''} onClick={() => setScreen('home')}>Country</button>
          <button className={screen === 'region' ? 'active' : ''} onClick={() => setScreen('region')}>Region</button>
          <button className={screen === 'decision' ? 'active' : ''} onClick={() => setScreen('decision')}>Decision</button>
          <button className={screen === 'reflection' ? 'active' : ''} onClick={() => setScreen('reflection')}>Reflection</button>
        </nav>
      </div>
    </div>
  );
}

function RegionView({ region, onBack, onDecision }: { region: RegionSnapshot; onBack: () => void; onDecision: () => void }) {
  return (
    <section className="region-screen">
      <div className="panel panel--accent">
        <p className="eyebrow">Region view</p>
        <h2>{region.name}</h2>
        <p>{region.culturalNote}</p>
      </div>
      <section className="panel-grid">
        <section className="panel">
          <h3>What people care about</h3>
          <p>{region.whatPeopleCareAbout}</p>
          <div className="region-tags">
            <span className="badge">{region.capital}</span>
            <span className="badge badge--soft">{region.clubAnchor}</span>
            <span className="badge badge--soft">{region.coastline}</span>
          </div>
        </section>
        <section className="panel">
          <h3>Current pressure</h3>
          <p>{region.currentPressure}</p>
          <div className="mini-metrics">
            <MetricPill label="Regional trust" value={region.metrics.trust} tone="good" />
            <MetricPill label="Wellbeing" value={region.metrics.wellbeing} tone="good" />
            <MetricPill label="Pressure" value={region.metrics.pressure} tone="warning" />
          </div>
        </section>
      </section>
      <div className="panel-actions">
        <button className="secondary-button" type="button" onClick={onBack}>Back to country</button>
        <button className="primary-button" type="button" onClick={onDecision}>Respond to the next issue</button>
      </div>
    </section>
  );
}

function topPressure(regions: RegionSnapshot[]) {
  return [...regions].sort((left, right) => right.metrics.pressure - left.metrics.pressure).slice(0, 3);
}

function labelForMetric(metric: MetricKey) {
  return metric.charAt(0).toUpperCase() + metric.slice(1);
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function cloneStateFrom(state: ExperienceState): ExperienceState {
  return JSON.parse(JSON.stringify(state)) as ExperienceState;
}

function describeLeader(metrics: ExperienceState['metrics']) {
  const score = metrics.fairness + metrics.trust + metrics.resilience - metrics.fragility - metrics.stress;
  if (score >= 150) return 'Steady Steward';
  if (score >= 120) return 'Practical Reformer';
  return 'Uneasy Caretaker';
}
