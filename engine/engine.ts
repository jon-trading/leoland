import { Country, Decision, Effect, GameState, RegionEffect, RegionState } from "./types";

export function createGameState(country: Country, regions: RegionState[], maxTurns = 4): GameState {
  return {
    country,
    regions,
    turn: 1,
    maxTurns,
    history: [],
  };
}

export function decisionsForTurn(decisions: Decision[], turn: number): Decision[] {
  return decisions.filter((decision) => decision.turn === turn);
}

export function applyDecision(state: GameState, decision: Decision, optionIndex: number): void {
  const option = decision.options[optionIndex];
  if (!option) {
    throw new Error(`Invalid option index ${optionIndex} for decision ${decision.id}`);
  }

  option.effects.forEach((effect) => applyCountryEffect(state.country, effect));
  option.regionEffects?.forEach((effect) => applyRegionEffect(state.regions, effect));

  calculateDerivedStats(state.country, state.regions);
  updateLegacyScore(state.country, state.regions);
  clampCountry(state.country);
  clampRegions(state.regions);

  state.history.push({
    turn: state.turn,
    decisionId: decision.id,
    decisionTitle: decision.title,
    optionLabel: option.label,
    issueTag: decision.issueTag,
  });
  state.turn += 1;
}

function applyCountryEffect(country: Country, effect: Effect): void {
  const path = effect.stat.split(".");
  if (path.length === 1) {
    const key = path[0] as keyof Country;
    (country[key] as number) += effect.amount;
    return;
  }

  if (path[0] === "values") {
    const valueKey = path[1] as keyof Country["values"];
    country.values[valueKey] += effect.amount;
  }
}

function applyRegionEffect(regions: RegionState[], effect: RegionEffect): void {
  const region = regions.find((item) => item.key === effect.regionKey);
  if (!region) {
    return;
  }
  region[effect.stat] += effect.amount;
}

function calculateDerivedStats(country: Country, regions: RegionState[]): void {
  const averageRegionTrust = average(regions.map((region) => region.trust));
  const averageEconomicPressure = average(regions.map((region) => region.economicPressure));
  const averageServicePressure = average(regions.map((region) => region.publicServicePressure));
  const averageMood = average(regions.map((region) => region.mood));

  country.cohesion += (averageRegionTrust - 55) * 0.04 + (averageMood - 55) * 0.03;
  country.unrest += (averageEconomicPressure - 50) * 0.06 + (averageServicePressure - 50) * 0.05 - (country.trust - 50) * 0.05;
  country.globalReputation += (country.environment - 55) * 0.02 + (country.mediaFreedom - 55) * 0.015;
}

function updateLegacyScore(country: Country, regions: RegionState[]): void {
  const averageMood = average(regions.map((region) => region.mood));
  const score =
    country.trust * 0.25 +
    country.cohesion * 0.2 +
    country.environment * 0.15 +
    country.education * 0.15 +
    country.globalReputation * 0.15 +
    averageMood * 0.1 -
    country.unrest * 0.35;

  country.legacyScore += Math.floor(score / 12);
}

function clampCountry(country: Country): void {
  country.trust = clamp(country.trust);
  country.cohesion = clamp(country.cohesion);
  country.environment = clamp(country.environment);
  country.unrest = clamp(country.unrest);
  country.globalReputation = clamp(country.globalReputation);
  country.mediaFreedom = clamp(country.mediaFreedom);
  country.education = clamp(country.education);
  country.values.capitalism = clamp(country.values.capitalism);
  country.values.collectivism = clamp(country.values.collectivism);
  country.values.nationalism = clamp(country.values.nationalism);
  country.values.globalism = clamp(country.values.globalism);
  country.values.populism = clamp(country.values.populism);
  country.values.civicResponsibility = clamp(country.values.civicResponsibility);
}

function clampRegions(regions: RegionState[]): void {
  for (const region of regions) {
    region.trust = clamp(region.trust);
    region.mood = clamp(region.mood);
    region.economicPressure = clamp(region.economicPressure);
    region.publicServicePressure = clamp(region.publicServicePressure);
  }
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

export function topRegionHotspots(regions: RegionState[]): RegionState[] {
  return [...regions].sort((left, right) => {
    const leftStress = left.economicPressure + left.publicServicePressure - left.trust - left.mood;
    const rightStress = right.economicPressure + right.publicServicePressure - right.trust - right.mood;
    return rightStress - leftStress;
  });
}

export function endOfRunAssessment(country: Country): string {
  if (country.legacyScore >= 18 && country.trust >= 65 && country.unrest <= 35) {
    return "Leoland feels steadier, fairer, and more hopeful. This is the shape of leadership the game wants to reward.";
  }
  if (country.legacyScore >= 10) {
    return "You held the country together and made some real progress, but the next term would still demand better balance and patience.";
  }
  return "The country still feels brittle. The next playable iteration should help the player understand why short-term fixes keep leaving hidden costs behind.";
}
