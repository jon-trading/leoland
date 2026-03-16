import { Country, Decision } from "./types";

export const finland: Country = {
  id: "FI",
  name: "Finland",
  leader: {
    name: "Alex Saarinen",
    charisma: 60,
    integrity: 90,
    strategicVision: 85,
    ego: 20
  },
  population: 5500000,
  gdp: 300_000_000_000,
  trust: 75,
  cohesion: 80,
  environment: 85,
  mediaFreedom: 90,
  education: 88,
  globalReputation: 70,
  unrest: 10,
  legacyScore: 0,
  values: {
    capitalism: 55,
    collectivism: 65,
    nationalism: 30,
    globalism: 75,
    populism: 20,
    civicResponsibility: 80
  }
};

export const decisions: Decision[] = [
  {
    id: "climate_subsidy",
    title: "Green Energy Subsidy",
    description: "Should Finland invest heavily in solar and wind energy?",
    options: [
      {
        label: "Yes, long-term investment",
        effects: [
          { stat: "environment", amount: 10 },
          { stat: "gdp", amount: -500000000 },
          { stat: "trust", amount: 3 },
          { stat: "legacyScore", amount: 5 }
        ]
      },
      {
        label: "No, too expensive",
        effects: [
          { stat: "environment", amount: -5 },
          { stat: "gdp", amount: 0 },
          { stat: "trust", amount: -2 }
        ]
      }
    ]
  },
  {
    id: "education_reform",
    title: "Education Reform",
    description: "Introduce critical thinking and ethics courses in all schools?",
    options: [
      {
        label: "Yes, reshape minds for future",
        effects: [
          { stat: "education", amount: 5 },
          { stat: "values.civicResponsibility", amount: 5 },
          { stat: "trust", amount: 2 }
        ]
      },
      {
        label: "No, leave as is",
        effects: [
          { stat: "education", amount: 0 },
          { stat: "trust", amount: -1 }
        ]
      }
    ]
  }
];
