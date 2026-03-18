import { useMemo, useState } from 'react';
import { DecisionCard } from './components/DecisionCard';
import { MapCard } from './components/MapCard';
import { MetricPill } from './components/MetricPill';
import { ReflectionCard } from './components/ReflectionCard';
import { applyScenarioOption, canAdvance, createNewSession } from './game/engine';
import { currentNationalPosture, describeLeader, institutionsUnderStrain, labelForMetric, mostImportantIssues, stewardshipSignal, topPressuredRegions } from './game/selectors';
import { MetricKey, RegionState, ScenarioOption, WorldState } from './game/types';

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

export default function App() {
  const [screen, setScreen] = useState<ScreenKey>('home');
  const [world, setWorld] = useState<WorldState>(() => createNewSession());
  const [lastReflection, setLastReflection] = useState('Start a run and discover what sort of steward you become under real pressure.');
  const [lastDelta, setLastDelta] = useState<Array<{ label: string; delta: number }>>([]);
  const [lastOutcomeSummary, setLastOutcomeSummary] = useState<{ improved: string[]; fragile: string[] }>({ improved: [], fragile: [] });

  const activeScenario = world.scenarios[0] ?? null;
  const selectedRegion = world.regions.find((region) => region.id === world.selectedRegionId) ?? world.regions[0];
  const leaderArchetype = useMemo(() => describeLeader(world.country), [world.country]);
  const nationalPosture = useMemo(() => currentNationalPosture(world.country), [world.country]);
  const stewardship = useMemo(() => stewardshipSignal(world.country), [world.country]);
  const pressuredRegions = useMemo(() => topPressuredRegions(world.regions), [world.regions]);
  const strainedInstitutions = useMemo(() => institutionsUnderStrain(world.institutions), [world.institutions]);
  const topIssues = useMemo(() => mostImportantIssues(world), [world]);

  function selectRegion(regionId: string) {
    setWorld((current) => ({ ...current, selectedRegionId: regionId }));
    setScreen('region');
  }

  function chooseOption(option: ScenarioOption) {
    const result = applyScenarioOption(world, option);
    setWorld(result.world);
    setLastReflection(result.outcome.reflectionText);
    setLastDelta(result.outcome.changedMetrics.slice(0, 5).map((item) => ({ label: labelForMetric(item.key), delta: item.delta })));
    setLastOutcomeSummary({ improved: result.outcome.whatImproved, fragile: result.outcome.whatBecameMoreFragile });
    setScreen('reflection');
  }

  function startFreshRun() {
    setWorld(createNewSession());
    setLastReflection('A new run begins. Choose calmly. Help people live well together.');
    setLastDelta([]);
    setLastOutcomeSummary({ improved: [], fragile: [] });
    setScreen('home');
  }

  return (
    <div className="mobile-scene">
      <div className="mobile-shell">
        <header className="hero-card">
          <div>
            <p className="eyebrow">Leoland</p>
            <h1>A society worth stewarding</h1>
            <p className="hero-copy">
              Govern with fairness, practical wisdom, and long-term care. In Leoland, humane choices are not soft choices. They are what make a whole country hold together.
            </p>
          </div>
          <div className="hero-badges">
            <span className="badge">Mobile-first</span>
            <span className="badge badge--soft">Desktop-friendly</span>
            <span className="badge badge--soft">Turn {world.country.turn} · {world.country.season}</span>
          </div>
        </header>

        <section className="wellbeing-grid">
          {primaryMetrics.map((metric) => (
            <MetricPill
              key={metric.key}
              label={metric.label}
              value={world.country.metrics[metric.key]}
              tone={metric.key === 'stress' || metric.key === 'fragility' ? 'warning' : 'good'}
            />
          ))}
        </section>

        {screen === 'home' && (
          <>
            <MapCard
              regions={world.regions.map((region) => ({
                id: region.id,
                name: region.name,
                capital: region.identity.capital,
                moodLabel: region.identity.moodLabel,
                culturalNote: region.identity.culturalNote,
                clubAnchor: region.identity.clubAnchor,
                currentPressure: region.currentKeyIssue,
                whatPeopleCareAbout: region.identity.whatPeopleCareAbout,
                coastline: region.identity.coastline,
                metrics: {
                  trust: region.trust,
                  wellbeing: region.wellbeing,
                  pressure: region.pressure,
                },
              }))}
              selectedRegionId={world.selectedRegionId}
              onSelectRegion={selectRegion}
            />
            <section className="panel-grid">
              <section className="panel">
                <p className="eyebrow">National posture</p>
                <h2>{nationalPosture}</h2>
                <p>{world.country.headlineSituation}</p>
                <div className="region-tags">
                  <span className="badge">{leaderArchetype}</span>
                  <span className="badge badge--soft">{stewardship}</span>
                </div>
              </section>
              <section className="panel panel--accent">
                <p className="eyebrow">Current scenario</p>
                <h2>{activeScenario?.title ?? 'No active scenario'}</h2>
                <p>{activeScenario?.whatIsAtStake ?? 'The country is waiting for the next question to become clear.'}</p>
                {activeScenario && (
                  <button className="primary-button" type="button" onClick={() => setScreen('decision')}>
                    Consider response
                  </button>
                )}
              </section>
            </section>
            <section className="panel-grid">
              <section className="panel">
                <p className="eyebrow">Most pressured regions</p>
                <ul className="pressure-list">
                  {pressuredRegions.map((region) => (
                    <li key={region.id}>
                      <strong>{region.name}</strong>
                      <span>{region.currentKeyIssue}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="panel">
                <p className="eyebrow">Institutions under strain</p>
                <ul className="pressure-list">
                  {strainedInstitutions.map((institution) => (
                    <li key={institution.id}>
                      <strong>{institution.name}</strong>
                      <span>{institution.note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </section>
            <section className="panel">
              <p className="eyebrow">Top issue tracks</p>
              <div className="issue-grid">
                {topIssues.map((issue) => (
                  <div key={issue.id} className="issue-chip">
                    <strong>{issue.name}</strong>
                    <span>{issue.headline}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {screen === 'region' && <RegionView region={selectedRegion} onBack={() => setScreen('home')} onDecision={() => setScreen('decision')} />}
        {screen === 'decision' && activeScenario && <DecisionCard decision={activeScenario} onChoose={chooseOption} />}
        {screen === 'reflection' && (
          <>
            <ReflectionCard reflection={lastReflection} leaderArchetype={leaderArchetype} changed={lastDelta} />
            <section className="panel-grid">
              <section className="panel">
                <p className="eyebrow">What improved</p>
                <ul className="pressure-list">
                  {(lastOutcomeSummary.improved.length ? lastOutcomeSummary.improved : ['Nothing yet']).map((label) => (
                    <li key={label}><strong>{label}</strong></li>
                  ))}
                </ul>
              </section>
              <section className="panel panel--accent">
                <p className="eyebrow">What is still fragile</p>
                <ul className="pressure-list">
                  {(lastOutcomeSummary.fragile.length ? lastOutcomeSummary.fragile : ['The country feels steadier after this turn.']).map((label) => (
                    <li key={label}><strong>{label}</strong></li>
                  ))}
                </ul>
              </section>
            </section>
            <section className="panel-grid">
              <section className="panel">
                <p className="eyebrow">Who is still under pressure</p>
                <ul className="pressure-list">
                  {pressuredRegions.map((region) => (
                    <li key={region.id}>
                      <strong>{region.name}</strong>
                      <span>{region.currentKeyIssue}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="panel panel--accent">
                <p className="eyebrow">Next move</p>
                <p>
                  {canAdvance(world)
                    ? 'Return to the country view, notice which regions and institutions changed, and take the next decision with the whole society in mind.'
                    : 'This first run is complete. Start another and see whether a different kind of stewardship creates a steadier country.'}
                </p>
                <div className="panel-actions">
                  {canAdvance(world) ? (
                    <button className="primary-button" type="button" onClick={() => setScreen('home')}>
                      Back to country
                    </button>
                  ) : (
                    <button className="primary-button" type="button" onClick={startFreshRun}>
                      Start a fresh run
                    </button>
                  )}
                </div>
              </section>
            </section>
          </>
        )}

        <nav className="bottom-nav">
          <button className={screen === 'home' ? 'active' : ''} onClick={() => setScreen('home')}>Country</button>
          <button className={screen === 'region' ? 'active' : ''} onClick={() => setScreen('region')}>Region</button>
          <button className={screen === 'decision' ? 'active' : ''} onClick={() => setScreen('decision')} disabled={!activeScenario}>Decision</button>
          <button className={screen === 'reflection' ? 'active' : ''} onClick={() => setScreen('reflection')}>Reflection</button>
        </nav>
      </div>
    </div>
  );
}

function RegionView({ region, onBack, onDecision }: { region: RegionState; onBack: () => void; onDecision: () => void }) {
  return (
    <section className="region-screen">
      <div className="panel panel--accent">
        <p className="eyebrow">Region view</p>
        <h2>{region.name}</h2>
        <p>{region.identity.culturalNote}</p>
      </div>
      <section className="panel-grid">
        <section className="panel">
          <h3>What people care about</h3>
          <p>{region.identity.whatPeopleCareAbout}</p>
          <div className="region-tags">
            <span className="badge">{region.identity.capital}</span>
            <span className="badge badge--soft">{region.identity.clubAnchor}</span>
            <span className="badge badge--soft">{region.identity.coastline}</span>
          </div>
        </section>
        <section className="panel">
          <h3>Current pressure</h3>
          <p>{region.currentKeyIssue}</p>
          <div className="mini-metrics">
            <MetricPill label="Regional trust" value={region.trust} tone="good" />
            <MetricPill label="Wellbeing" value={region.wellbeing} tone="good" />
            <MetricPill label="Pressure" value={region.pressure} tone="warning" />
          </div>
        </section>
      </section>
      <section className="panel-grid">
        <section className="panel">
          <h3>Belonging and resilience</h3>
          <p>{region.headline}</p>
          <div className="mini-metrics">
            <MetricPill label="Belonging" value={region.belonging} tone="good" />
            <MetricPill label="Resilience" value={region.resilience} tone="good" />
            <MetricPill label="Service strain" value={region.serviceStrain} tone="warning" />
          </div>
        </section>
        <section className="panel">
          <h3>Regional note</h3>
          <p>{region.notes}</p>
          <span className="badge badge--soft">{region.identity.moodLabel}</span>
        </section>
      </section>
      <div className="panel-actions">
        <button className="secondary-button" type="button" onClick={onBack}>Back to country</button>
        <button className="primary-button" type="button" onClick={onDecision}>Respond to the active issue</button>
      </div>
    </section>
  );
}
