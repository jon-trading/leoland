import { CountryPulse, CountryState, InstitutionState, MetricKey, RegionState, WorldState } from './types';

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

export function countryPulse(country: CountryState): CountryPulse {
  return country.pulse;
}

export function mostHopefulRegions(regions: RegionState[], count = 3) {
  return [...regions]
    .sort(
      (left, right) =>
        right.communityWarmth + right.civicPride + right.youthOutlook - right.neglectFeeling -
        (left.communityWarmth + left.civicPride + left.youthOutlook - left.neglectFeeling)
    )
    .slice(0, count);
}

export function mostNeglectedRegions(regions: RegionState[], count = 3) {
  return [...regions]
    .sort((left, right) => right.neglectFeeling - left.neglectFeeling)
    .slice(0, count);
}

export function institutionSpotlight(world: WorldState) {
  return world.institutions.find((institution) => institution.id === world.country.pulse.institutionSpotlightId) ?? world.institutions[0];
}

export function strongestInstitutions(institutions: InstitutionState[], count = 3) {
  return [...institutions]
    .sort((left, right) => right.effectiveness + right.morale - (left.effectiveness + left.morale))
    .slice(0, count);
}

export function regionFeelingSummary(region: RegionState) {
  if (region.communityWarmth >= 68 && region.neglectFeeling <= 35) {
    return 'People here feel seen, connected, and capable of weathering pressure together.';
  }
  if (region.neglectFeeling >= 60) {
    return 'People still care deeply about this place, but too much of the strain feels privately carried.';
  }
  if (region.youthOutlook <= 45) {
    return 'Young people need stronger reasons to believe life here will widen rather than narrow.';
  }
  return 'Daily life feels mixed: decent in parts, strained in parts, and still worth steady care.';
}

export function institutionFeelingSummary(institution: InstitutionState) {
  if (institution.heldness >= 68 && institution.morale >= 64) {
    return `${institution.name} feels like a place where people are still being held rather than processed.`;
  }
  if (institution.strain >= 68 || institution.morale <= 48) {
    return `${institution.name} is still doing important work, but people can feel the stretch and the thinning patience around it.`;
  }
  return `${institution.name} is functioning, but its strength still depends on calm repair rather than triumphal headlines.`;
}
