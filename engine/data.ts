import { Decision } from "./types";

export const prototypeDecisions: Decision[] = [
  {
    id: "coastal_energy_program",
    title: "North Atlantic Energy Transition",
    description: "Should Leoland back a long-horizon tidal, wind, and grid renewal program even if it slows short-term spending freedom?",
    options: [
      {
        label: "Yes, invest for resilience",
        effects: [
          { stat: "environment", amount: 8 },
          { stat: "gdp", amount: -6500000000 },
          { stat: "trust", amount: 4 },
          { stat: "legacyScore", amount: 5 },
        ],
      },
      {
        label: "Delay and protect short-term budgets",
        effects: [
          { stat: "environment", amount: -4 },
          { stat: "trust", amount: -2 },
          { stat: "legacyScore", amount: -1 },
        ],
      },
    ],
  },
  {
    id: "civic_education_charter",
    title: "Civic Education Charter",
    description: "Should Leoland add ethics, media literacy, and civic responsibility to every school tier?",
    options: [
      {
        label: "Yes, teach judgment early",
        effects: [
          { stat: "education", amount: 6 },
          { stat: "values.civicResponsibility", amount: 6 },
          { stat: "trust", amount: 3 },
        ],
      },
      {
        label: "Keep the curriculum unchanged",
        effects: [
          { stat: "education", amount: 0 },
          { stat: "trust", amount: -2 },
          { stat: "cohesion", amount: -1 },
        ],
      },
    ],
  },
];
