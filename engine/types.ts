export interface Values {
  capitalism: number;
  collectivism: number;
  nationalism: number;
  globalism: number;
  populism: number;
  civicResponsibility: number;
}

export interface Leader {
  name: string;
  charisma: number;
  integrity: number;
  strategicVision: number;
  ego: number;
}

export interface Country {
  id: string;
  name: string;
  leader: Leader;
  population: number;
  gdp: number;
  trust: number;
  cohesion: number;
  environment: number;
  mediaFreedom: number;
  education: number;
  values: Values;
  globalReputation: number;
  unrest: number;
  legacyScore: number;
}

export interface Effect {
  stat: string;
  amount: number;
}

export interface RegionEffect {
  regionKey: string;
  stat: "trust" | "mood" | "economicPressure" | "publicServicePressure";
  amount: number;
}

export interface DecisionOption {
  label: string;
  summary: string;
  effects: Effect[];
  regionEffects?: RegionEffect[];
}

export interface Decision {
  id: string;
  turn: number;
  title: string;
  description: string;
  issueTag: string;
  regionTags: string[];
  options: DecisionOption[];
}

export interface RegionState {
  key: string;
  name: string;
  capital: string;
  identity: string;
  clubAnchor: string;
  dominantIssue: string;
  politicalTemperament: string;
  trust: number;
  mood: number;
  economicPressure: number;
  publicServicePressure: number;
}

export interface TurnRecord {
  turn: number;
  decisionId: string;
  decisionTitle: string;
  optionLabel: string;
  issueTag: string;
}

export interface GameState {
  country: Country;
  regions: RegionState[];
  turn: number;
  maxTurns: number;
  history: TurnRecord[];
}
