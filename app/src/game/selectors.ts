import { CountryState, InstitutionState, MetricKey, RegionState, WorldState } from './types';

export function labelForMetric(metric: MetricKey) {
  return metric.charAt(0).toUpperCase() + metric.slice(1);
}

export function describeLeader(country: CountryState) {
  const metrics = country.metrics;
  const score = metrics.fairness + metrics.trust + metrics.resilience + metrics.happiness - metrics.fragility - metrics.stress;
  if (score >= 185) return 'Steady Steward';
  if (score >= 155) return 'Practical Reformer';
  return 'Uneasy Caretaker';
}

export function currentNationalPosture(country: CountryState) {
  const positive = [country.metrics.happiness, country.metrics.health, country.metrics.fairness, country.metrics.trust, country.metrics.resilience].reduce((a, b) => a + b, 0) / 5;
  const negative = (country.metrics.stress + country.metrics.fragility) / 2;
  if (positive - negative >= 20) return 'Hopeful but watchful';
  if (positive - negative >= 8) return 'Holding together with effort';
  return 'Under visible strain';
}

export function topPressuredRegions(regions: RegionState[], count = 3) {
  return [...regions].sort((left, right) => right.pressure - left.pressure).slice(0, count);
}

export function institutionsUnderStrain(institutions: InstitutionState[], count = 3) {
  return [...institutions].sort((left, right) => right.strain - left.strain).slice(0, count);
}

export function mostImportantIssues(world: WorldState, count = 3) {
  return [...world.issues].sort((left, right) => right.pressure - left.pressure).slice(0, count);
}

export function stewardshipSignal(country: CountryState) {
  const strong = country.metrics.fairness + country.metrics.trust + country.metrics.resilience;
  const weak = country.metrics.stress + country.metrics.fragility;
  if (strong - weak > 110) return 'Care is compounding';
  if (strong - weak > 85) return 'The country is balancing strain with decency';
  return 'The social fabric needs steadier care';
}
