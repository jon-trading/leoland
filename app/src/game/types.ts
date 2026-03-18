export type PrimaryMetricKey =
  | 'happiness'
  | 'health'
  | 'safety'
  | 'fairness'
  | 'prosperity'
  | 'trust'
  | 'resilience';

export type TensionMetricKey = 'stress' | 'fragility';
export type MetricKey = PrimaryMetricKey | TensionMetricKey;

export type InstitutionKey =
  | 'schools'
  | 'healthcare'
  | 'housing'
  | 'transport'
  | 'local_services'
  | 'emergency_resilience'
  | 'community_life'
  | 'civic_information';

export type IssueTrackKey =
  | 'housing_strain'
  | 'hospital_queues'
  | 'flooding_risk'
  | 'child_wellbeing'
  | 'transport_reliability'
  | 'cost_of_living_pressure'
  | 'youth_belonging'
  | 'energy_affordability'
  | 'trust_in_public_life';

export type ScenarioStatus = 'available' | 'active' | 'resolved';
export type ScenarioUrgency = 'steady' | 'rising' | 'urgent';

export interface RegionIdentity {
  moodLabel: string;
  culturalNote: string;
  whatPeopleCareAbout: string;
  clubAnchor: string;
  capital: string;
  coastline: string;
}

export interface RegionState {
  id: string;
  name: string;
  identity: RegionIdentity;
  mood: number;
  trust: number;
  wellbeing: number;
  pressure: number;
  serviceStrain: number;
  belonging: number;
  resilience: number;
  currentKeyIssue: string;
  headline: string;
  notes: string;
}

export interface RegionSnapshot {
  id: string;
  name: string;
  capital: string;
  moodLabel: string;
  culturalNote: string;
  clubAnchor: string;
  currentPressure: string;
  whatPeopleCareAbout: string;
  coastline: string;
  metrics: {
    trust: number;
    wellbeing: number;
    pressure: number;
  };
}

export interface InstitutionState {
  id: InstitutionKey;
  name: string;
  strength: number;
  strain: number;
  publicTrust: number;
  fairnessImpact: number;
  note: string;
}

export interface IssueTrack {
  id: IssueTrackKey;
  name: string;
  pressure: number;
  trend: 'improving' | 'steady' | 'worsening';
  headline: string;
}

export interface ScenarioOption {
  id: string;
  label: string;
  summary: string;
  humaneLogic: string;
  likelyTradeoff: string;
  metricEffects: Partial<Record<MetricKey, number>>;
  treasuryDelta: number;
  regionEffects?: Array<{
    regionId: string;
    mood?: number;
    trust?: number;
    wellbeing?: number;
    pressure?: number;
    serviceStrain?: number;
    belonging?: number;
    resilience?: number;
    headline?: string;
  }>;
  institutionEffects?: Array<{
    institutionId: InstitutionKey;
    strength?: number;
    strain?: number;
    publicTrust?: number;
    fairnessImpact?: number;
    note?: string;
  }>;
  issueEffects?: Array<{
    issueId: IssueTrackKey;
    pressure?: number;
    trend?: IssueTrack['trend'];
    headline?: string;
  }>;
  reflection: string;
}

export interface ScenarioTemplate {
  id: string;
  title: string;
  theme: string;
  urgency: ScenarioUrgency;
  affectedRegionIds: string[];
  affectedInstitutionIds: InstitutionKey[];
  issueTrackIds: IssueTrackKey[];
  whatIsAtStake: string;
  intro: string;
  activationSummary: string;
  options: ScenarioOption[];
}

export interface ScenarioState {
  id: string;
  title: string;
  theme: string;
  status: ScenarioStatus;
  urgency: ScenarioUrgency;
  affectedRegionIds: string[];
  affectedInstitutionIds: InstitutionKey[];
  issueTrackIds: IssueTrackKey[];
  whatIsAtStake: string;
  intro: string;
  activationSummary: string;
  options: ScenarioOption[];
}

export interface TurnOutcome {
  turn: number;
  season: string;
  scenarioId: string;
  scenarioTitle: string;
  chosenActionId: string;
  chosenActionLabel: string;
  changedMetrics: Array<{ key: MetricKey; delta: number }>;
  changedRegions: Array<{ regionId: string; label: string }>;
  changedInstitutions: Array<{ institutionId: InstitutionKey; label: string }>;
  changedIssues: Array<{ issueId: IssueTrackKey; label: string }>;
  reflectionText: string;
  whatImproved: string[];
  whatBecameMoreFragile: string[];
}

export interface CountryState {
  turn: number;
  season: string;
  headlineSituation: string;
  metrics: Record<MetricKey, number>;
  treasury: number;
  activeScenarioId: string | null;
  activeScenarioIds: string[];
  completedScenarioIds: string[];
  history: TurnOutcome[];
}

export interface WorldState {
  country: CountryState;
  regions: RegionState[];
  institutions: InstitutionState[];
  issues: IssueTrack[];
  scenarios: ScenarioState[];
  selectedRegionId: string;
}
