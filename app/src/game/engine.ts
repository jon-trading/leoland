import { scenarioCatalog } from './scenarios';
import { createInitialWorldState, seasons } from './state';
import { CountryPulse, CountryState, CulturalMoment, InstitutionState, IssueTrack, MetricKey, RegionState, ScenarioOption, ScenarioState, ScenarioTemplate, TurnOutcome, WorldState } from './types';

export function createNewSession(): WorldState {
  const world = createInitialWorldState();
  refreshLivingCountry(world);
  return activateNextScenario(world);
}

export function activateNextScenario(world: WorldState): WorldState {
  const nextTemplate = pickNextScenario(world);
  if (!nextTemplate) return world;

  const scenario = materializeScenario(nextTemplate);
  const nextWorld = cloneWorld(world);
  nextWorld.country.activeScenarioId = scenario.id;
  nextWorld.country.activeScenarioIds = [scenario.id];
  nextWorld.country.headlineSituation = scenario.activationSummary;
  nextWorld.scenarios = [scenario];
  refreshLivingCountry(nextWorld);
  return nextWorld;
}

export function applyScenarioOption(world: WorldState, option: ScenarioOption): { world: WorldState; outcome: TurnOutcome } {
  const nextWorld = cloneWorld(world);
  const activeScenario = getActiveScenario(nextWorld);
  if (!activeScenario) {
    throw new Error('No active scenario to apply');
  }

  const changedMetrics: TurnOutcome['changedMetrics'] = [];
  const changedRegions: TurnOutcome['changedRegions'] = [];
  const changedInstitutions: TurnOutcome['changedInstitutions'] = [];
  const changedIssues: TurnOutcome['changedIssues'] = [];

  Object.entries(option.metricEffects).forEach(([key, delta]) => {
    if (typeof delta !== 'number') return;
    nextWorld.country.metrics[key as MetricKey] = clamp(nextWorld.country.metrics[key as MetricKey] + delta);
    changedMetrics.push({ key: key as MetricKey, delta });
  });

  nextWorld.country.treasury = clamp(nextWorld.country.treasury + option.treasuryDelta);

  option.regionEffects?.forEach((effect) => {
    const region = nextWorld.regions.find((entry) => entry.id === effect.regionId);
    if (!region) return;
    applyRegionEffect(region, effect);
    changedRegions.push({ regionId: region.id, label: region.name });
  });

  option.institutionEffects?.forEach((effect) => {
    const institution = nextWorld.institutions.find((entry) => entry.id === effect.institutionId);
    if (!institution) return;
    applyInstitutionEffect(institution, effect);
    changedInstitutions.push({ institutionId: institution.id, label: institution.name });
  });

  option.issueEffects?.forEach((effect) => {
    const issue = nextWorld.issues.find((entry) => entry.id === effect.issueId);
    if (!issue) return;
    applyIssueEffect(issue, effect);
    changedIssues.push({ issueId: issue.id, label: issue.name });
  });

  applyInterdependence(nextWorld, activeScenario, option);

  const outcome = buildOutcome(nextWorld, activeScenario, option, changedMetrics, changedRegions, changedInstitutions, changedIssues);
  nextWorld.country.history.push(outcome);
  nextWorld.country.completedScenarioIds.push(activeScenario.id);
  nextWorld.country.activeScenarioId = null;
  nextWorld.country.activeScenarioIds = [];
  nextWorld.scenarios = [];

  if (nextWorld.country.turn < 5) {
    nextWorld.country.turn += 1;
    nextWorld.country.season = seasons[Math.min(nextWorld.country.turn - 1, seasons.length - 1)];
    const advanced = activateNextScenario(nextWorld);
    advanced.country.headlineSituation = buildHeadline(advanced);
    refreshLivingCountry(advanced);
    return { world: advanced, outcome };
  }

  nextWorld.country.headlineSituation = 'This first session closes with a country still in motion: steadier in some places, more fragile in others, and asking what sort of steward you will become next.';
  refreshLivingCountry(nextWorld);
  return { world: nextWorld, outcome };
}

export function canAdvance(world: WorldState) {
  return world.country.turn <= 5;
}

function materializeScenario(template: ScenarioTemplate): ScenarioState {
  return {
    ...template,
    status: 'active',
  };
}

function pickNextScenario(world: WorldState) {
  const available = scenarioCatalog.filter((scenario) => !world.country.completedScenarioIds.includes(scenario.id));
  if (available.length === 0) return null;

  return [...available]
    .map((scenario) => ({ scenario, score: scenarioScore(world, scenario) }))
    .sort((left, right) => right.score - left.score)[0].scenario;
}

function scenarioScore(world: WorldState, scenario: ScenarioTemplate) {
  const issuePressure = scenario.issueTrackIds
    .map((id) => world.issues.find((issue) => issue.id === id)?.pressure ?? 50)
    .reduce((sum, value) => sum + value, 0);
  const regionPressure = scenario.affectedRegionIds
    .map((id) => world.regions.find((region) => region.id === id)?.pressure ?? 50)
    .reduce((sum, value) => sum + value, 0);
  const institutionStrain = scenario.affectedInstitutionIds
    .map((id) => world.institutions.find((institution) => institution.id === id)?.strain ?? 50)
    .reduce((sum, value) => sum + value, 0);
  const urgencyBonus = scenario.urgency === 'urgent' ? 24 : scenario.urgency === 'rising' ? 12 : 0;
  return issuePressure + regionPressure + institutionStrain + urgencyBonus;
}

function getActiveScenario(world: WorldState) {
  return world.scenarios.find((scenario) => scenario.status === 'active') ?? null;
}

function applyRegionEffect(region: RegionState, effect: NonNullable<ScenarioOption['regionEffects']>[number]) {
  if (typeof effect.mood === 'number') region.mood = clamp(region.mood + effect.mood);
  if (typeof effect.trust === 'number') region.trust = clamp(region.trust + effect.trust);
  if (typeof effect.wellbeing === 'number') region.wellbeing = clamp(region.wellbeing + effect.wellbeing);
  if (typeof effect.pressure === 'number') region.pressure = clamp(region.pressure + effect.pressure);
  if (typeof effect.serviceStrain === 'number') region.serviceStrain = clamp(region.serviceStrain + effect.serviceStrain);
  if (typeof effect.belonging === 'number') region.belonging = clamp(region.belonging + effect.belonging);
  if (typeof effect.resilience === 'number') region.resilience = clamp(region.resilience + effect.resilience);
  if (typeof effect.civicPride === 'number') region.civicPride = clamp(region.civicPride + effect.civicPride);
  if (typeof effect.youthOutlook === 'number') region.youthOutlook = clamp(region.youthOutlook + effect.youthOutlook);
  if (typeof effect.communityWarmth === 'number') region.communityWarmth = clamp(region.communityWarmth + effect.communityWarmth);
  if (typeof effect.neglectFeeling === 'number') region.neglectFeeling = clamp(region.neglectFeeling + effect.neglectFeeling);
  if (effect.headline) region.headline = effect.headline;
}

function applyInstitutionEffect(institution: InstitutionState, effect: NonNullable<ScenarioOption['institutionEffects']>[number]) {
  if (typeof effect.strength === 'number') institution.strength = clamp(institution.strength + effect.strength);
  if (typeof effect.strain === 'number') institution.strain = clamp(institution.strain + effect.strain);
  if (typeof effect.publicTrust === 'number') institution.publicTrust = clamp(institution.publicTrust + effect.publicTrust);
  if (typeof effect.fairnessImpact === 'number') institution.fairnessImpact = clamp(institution.fairnessImpact + effect.fairnessImpact);
  if (typeof effect.effectiveness === 'number') institution.effectiveness = clamp(institution.effectiveness + effect.effectiveness);
  if (typeof effect.morale === 'number') institution.morale = clamp(institution.morale + effect.morale);
  if (typeof effect.heldness === 'number') institution.heldness = clamp(institution.heldness + effect.heldness);
  if (effect.note) institution.note = effect.note;
}

function applyIssueEffect(issue: IssueTrack, effect: NonNullable<ScenarioOption['issueEffects']>[number]) {
  if (typeof effect.pressure === 'number') issue.pressure = clamp(issue.pressure + effect.pressure);
  if (effect.trend) issue.trend = effect.trend;
  if (effect.headline) issue.headline = effect.headline;
}

function applyInterdependence(world: WorldState, scenario: ScenarioState, option: ScenarioOption) {
  const strongestRegion = world.regions.find((region) => region.id === scenario.affectedRegionIds[0]);
  if (!strongestRegion) return;

  if ((option.metricEffects.fairness ?? 0) > 0) {
    world.regions.forEach((region) => {
      if (!scenario.affectedRegionIds.includes(region.id)) {
        region.trust = clamp(region.trust + 1);
      }
    });
  }

  if ((option.metricEffects.prosperity ?? 0) > 0 && (option.metricEffects.fairness ?? 0) < 0) {
    world.regions.forEach((region) => {
      if (!scenario.affectedRegionIds.includes(region.id)) {
        region.pressure = clamp(region.pressure + 2);
        region.belonging = clamp(region.belonging - 1);
      }
    });
  }

  world.country.metrics.trust = clamp(
    Math.round(world.regions.reduce((sum, region) => sum + region.trust, 0) / world.regions.length)
  );
  world.country.metrics.resilience = clamp(
    Math.round((world.regions.reduce((sum, region) => sum + region.resilience, 0) + world.institutions.reduce((sum, institution) => sum + institution.strength - institution.strain / 2, 0)) / 10)
  );
  world.country.metrics.fairness = clamp(
    Math.round((world.regions.reduce((sum, region) => sum + region.belonging, 0) / world.regions.length + world.institutions.reduce((sum, institution) => sum + institution.fairnessImpact, 0) / world.institutions.length) / 2)
  );
  world.country.metrics.health = clamp(
    Math.round((world.country.metrics.health + averageInstitution(world.institutions, 'healthcare') + averageRegion(world.regions, 'wellbeing')) / 3)
  );
  world.country.metrics.safety = clamp(
    Math.round((world.country.metrics.safety + averageInstitution(world.institutions, 'emergency_resilience') + averageRegion(world.regions, 'resilience')) / 3)
  );
  world.country.metrics.happiness = clamp(
    Math.round((averageRegion(world.regions, 'wellbeing') + averageRegion(world.regions, 'belonging') + world.country.metrics.happiness) / 3)
  );
  world.country.metrics.stress = clamp(Math.round(world.issues.reduce((sum, issue) => sum + issue.pressure, 0) / world.issues.length - 15));
  world.country.metrics.fragility = clamp(Math.round((world.country.metrics.stress + averageInstitutionStrain(world.institutions) - averageRegion(world.regions, 'resilience')) / 2));
  world.country.metrics.prosperity = clamp(Math.round((world.country.metrics.prosperity + averageRegion(world.regions, 'wellbeing') + strongestRegion.wellbeing) / 3));
  refreshLivingCountry(world);
}

function buildOutcome(
  world: WorldState,
  scenario: ScenarioState,
  option: ScenarioOption,
  changedMetrics: TurnOutcome['changedMetrics'],
  changedRegions: TurnOutcome['changedRegions'],
  changedInstitutions: TurnOutcome['changedInstitutions'],
  changedIssues: TurnOutcome['changedIssues']
): TurnOutcome {
  const whatImproved = changedMetrics.filter((change) => change.delta > 0).slice(0, 3).map((change) => capitalize(change.key));
  const whatBecameMoreFragile = changedMetrics.filter((change) => change.delta < 0).slice(0, 3).map((change) => capitalize(change.key));

  return {
    turn: world.country.turn,
    season: world.country.season,
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    chosenActionId: option.id,
    chosenActionLabel: option.label,
    changedMetrics,
    changedRegions,
    changedInstitutions,
    changedIssues,
    reflectionText: option.reflection,
    whatImproved,
    whatBecameMoreFragile,
  };
}

function buildHeadline(world: WorldState) {
  const biggestIssue = [...world.issues].sort((left, right) => right.pressure - left.pressure)[0];
  const mostPressedRegion = [...world.regions].sort((left, right) => right.pressure - left.pressure)[0];
  return `${biggestIssue.name} is now the sharpest national question, with ${mostPressedRegion.name} feeling the strain most clearly.`;
}

function refreshLivingCountry(world: WorldState) {
  const communityLife = world.institutions.find((institution) => institution.id === 'community_life');

  world.regions.forEach((region) => {
    region.civicPride = clamp(
      Math.round((region.trust + region.belonging + region.resilience + region.mood) / 4 - region.pressure * 0.12)
    );
    region.communityWarmth = clamp(
      Math.round((region.mood + region.belonging + region.trust + (communityLife?.heldness ?? 58)) / 4)
    );
    region.youthOutlook = clamp(
      Math.round((region.wellbeing + region.belonging + region.communityWarmth + (100 - region.pressure)) / 4)
    );
    region.neglectFeeling = clamp(
      Math.round((region.pressure + region.serviceStrain + (100 - region.trust) + (100 - region.belonging)) / 4)
    );
  });

  world.institutions.forEach((institution) => {
    institution.effectiveness = clamp(Math.round((institution.strength + (100 - institution.strain) + institution.fairnessImpact) / 3));
    institution.morale = clamp(Math.round((institution.publicTrust + institution.strength + (100 - institution.strain)) / 3));
    institution.heldness = clamp(Math.round((institution.publicTrust + institution.fairnessImpact + institution.morale) / 3));
  });

  world.country.pulse = buildCountryPulse(world);
}

function buildCountryPulse(world: WorldState): CountryPulse {
  const mostPressedRegion = [...world.regions].sort((left, right) => right.pressure - left.pressure)[0];
  const mostHopefulRegion = [...world.regions].sort(
    (left, right) =>
      right.communityWarmth + right.civicPride + right.youthOutlook - right.neglectFeeling -
      (left.communityWarmth + left.civicPride + left.youthOutlook - left.neglectFeeling)
  )[0];
  const spotlightInstitution = [...world.institutions].sort((left, right) => right.strain - left.strain)[0];
  const strongestInstitution = [...world.institutions].sort((left, right) => right.heldness + right.morale - (left.heldness + left.morale))[0];
  const topIssue = [...world.issues].sort((left, right) => right.pressure - left.pressure)[0];

  const positive = (world.country.metrics.happiness + world.country.metrics.fairness + world.country.metrics.trust + world.country.metrics.resilience) / 4;
  const negative = (world.country.metrics.stress + world.country.metrics.fragility) / 2;

  let emotionalWeather = 'Calm, hopeful, and quietly purposeful';
  let summary = `Daily life feels steadier, and ${mostHopefulRegion.name} is helping remind the country what belonging can look like.`;

  if (negative - positive > 10) {
    emotionalWeather = 'Heavy weather with pockets of care';
    summary = `People are carrying strain more openly now, especially in ${mostPressedRegion.name}, but there are still places where decency is holding.`;
  } else if (positive - negative < 10) {
    emotionalWeather = 'Mixed skies, practical hope';
    summary = `The country feels kinder than harsher systems usually allow, but ${topIssue.name.toLowerCase()} is still pulling hard at trust.`;
  }

  const bestImproving = strongestInstitution
    ? `${strongestInstitution.name} is helping people feel more held in daily life.`
    : 'Community life is still creating small reasons for hope.';

  const mostFragile = `${mostPressedRegion.name} feels closest to being asked to carry too much for too long.`;

  return {
    summary,
    emotionalWeather,
    nationalStory: buildNationalStory(world, mostHopefulRegion, mostPressedRegion, topIssue),
    bestImproving,
    mostFragile,
    institutionSpotlightId: spotlightInstitution.id,
    institutionSpotlightSummary: buildInstitutionSpotlightSummary(spotlightInstitution),
    culturalMoment: buildCulturalMoment(world, mostHopefulRegion, topIssue),
  };
}

function buildNationalStory(world: WorldState, hopefulRegion: RegionState, pressedRegion: RegionState, topIssue: IssueTrack) {
  if (world.country.metrics.fairness >= 64 && world.country.metrics.trust >= 64) {
    return `Leoland is learning that careful fairness can calm a whole country. ${hopefulRegion.name} is proof that people notice when society feels worth belonging to.`;
  }
  if (world.country.metrics.fragility >= 48 || world.country.metrics.stress >= 54) {
    return `The country still believes in itself, but ${topIssue.name.toLowerCase()} is making daily life feel narrower than it should. ${pressedRegion.name} is where that cost is being felt most plainly.`;
  }
  return `Leoland feels broadly decent, but still unfinished: one part of the country steadies, another asks not to be left carrying the harder weather alone.`;
}

function buildInstitutionSpotlightSummary(institution: InstitutionState) {
  if (institution.heldness >= 66) {
    return `${institution.name} currently feels like one of the places where people are still being held rather than abandoned.`;
  }
  if (institution.strain >= 68 || institution.morale <= 48) {
    return `${institution.name} is under visible pressure. People can feel that it is trying, but also that it needs calmer reinforcement.`;
  }
  return `${institution.name} is still functioning, but its long-term confidence depends on patient repair rather than slogans.`;
}

function buildCulturalMoment(world: WorldState, hopefulRegion: RegionState, topIssue: IssueTrack): CulturalMoment {
  if (topIssue.id === 'flooding_risk') {
    return {
      title: 'Sandbags, soup, and neighbourliness',
      summary: `${hopefulRegion.name} is reminding the country that resilience is social as well as physical: people show up faster when they still feel part of one another's lives.`,
      tone: 'care',
      regionId: hopefulRegion.id,
    };
  }

  if (world.country.metrics.happiness >= 64 || world.country.season === 'Harvest Light') {
    return {
      title: `${hopefulRegion.identity.clubAnchor} weekend and town-square music`,
      summary: `Across ${hopefulRegion.name}, civic pride is arriving through local ritual: school pitches, club scarves, harvest stalls, and people lingering a little longer together.`,
      tone: 'celebration',
      regionId: hopefulRegion.id,
    };
  }

  if (world.country.metrics.stress >= 52) {
    return {
      title: 'School halls turning into community rooms',
      summary: `When pressure rises, Leoland is healthiest where practical kindness appears first: shared meals, volunteer lifts, donated time, and local spaces that still feel open.`,
      tone: 'care',
      regionId: hopefulRegion.id,
    };
  }

  return {
    title: 'A country learning gentle rituals',
    summary: `This season feels shaped by ordinary belonging: regional pride, football talk as social weather, and the small civic habits that stop a place from feeling lonely.`,
    tone: 'ritual',
    regionId: hopefulRegion.id,
  };
}

function averageRegion(regions: RegionState[], key: 'wellbeing' | 'resilience' | 'belonging') {
  return Math.round(regions.reduce((sum, region) => sum + region[key], 0) / regions.length);
}

function averageInstitution(institutions: InstitutionState[], key: InstitutionState['id']) {
  return institutions.find((institution) => institution.id === key)?.strength ?? 55;
}

function averageInstitutionStrain(institutions: InstitutionState[]) {
  return Math.round(institutions.reduce((sum, institution) => sum + institution.strain, 0) / institutions.length);
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');
}

function cloneWorld(world: WorldState): WorldState {
  return JSON.parse(JSON.stringify(world)) as WorldState;
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
