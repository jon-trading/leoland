import { Country, Effect, Decision } from "./types";

export function runTurn(country: Country, options: string[], decisions: Decision[]): void {
  for (let i = 0; i < decisions.length; i++) {
    const chosen = decisions[i].options.find(opt => opt.label === options[i]);
    chosen?.effects.forEach(effect => applyEffect(country, effect));
  }

  calculateDerivedStats(country);
  updateLegacyScore(country);
  clampStats(country);
}

function applyEffect(country: Country, effect: Effect) {
  const path = effect.stat.split(".");
  if (path.length === 1) {
    (country as any)[path[0]] += effect.amount;
  } else {
    (country as any)[path[0]][path[1]] += effect.amount;
  }
}

function clampStats(country: Country) {
  const clamp = (val: number, min = 0, max = 100) => Math.max(min, Math.min(max, val));
  country.trust = clamp(country.trust);
  country.cohesion = clamp(country.cohesion);
  country.environment = clamp(country.environment);
  country.unrest = clamp(country.unrest);
  country.globalReputation = clamp(country.globalReputation);
  country.mediaFreedom = clamp(country.mediaFreedom);
  country.education = clamp(country.education);
}

function calculateDerivedStats(country: Country) {
  const unrestBoost = (100 - country.trust) * 0.1 + (100 - country.cohesion) * 0.1;
  country.unrest += unrestBoost;
}

function updateLegacyScore(country: Country) {
  const score =
    country.trust * 0.3 +
    country.cohesion * 0.2 +
    country.environment * 0.2 +
    country.globalReputation * 0.3 -
    country.unrest * 0.4;

  country.legacyScore += Math.floor(score / 10);
}
