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

export interface DecisionOption {
  id: string;
  label: string;
  summary: string;
  humaneLogic: string;
  metricEffects: Partial<Record<MetricKey, number>>;
  regionEffects?: Array<{
    regionId: string;
    trust?: number;
    wellbeing?: number;
    pressure?: number;
  }>;
  reflection: string;
}

export interface DecisionCard {
  id: string;
  title: string;
  theme: string;
  situation: string;
  whyItMatters: string;
  regionIds: string[];
  options: DecisionOption[];
}

export interface TurnRecord {
  decisionId: string;
  decisionTitle: string;
  optionLabel: string;
  reflection: string;
}

export interface ExperienceState {
  metrics: Record<MetricKey, number>;
  regions: RegionSnapshot[];
  currentDecisionIndex: number;
  selectedRegionId: string;
  history: TurnRecord[];
}
