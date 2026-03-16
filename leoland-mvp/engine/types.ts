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
  delay?: number;
}

export interface DecisionOption {
  label: string;
  effects: Effect[];
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  options: DecisionOption[];
}
