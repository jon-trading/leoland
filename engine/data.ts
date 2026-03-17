import { Decision } from "./types";

export const starterDeck: Decision[] = [
  {
    id: "housing_build_accelerator",
    turn: 1,
    title: "Housing Build Accelerator",
    description: "A national plan would speed up housing construction near rail and port corridors, but it will upset local veto powers and budget hawks.",
    issueTag: "housing_supply",
    regionTags: ["eastbridge", "riverglass", "southwatch"],
    options: [
      {
        label: "Push it through with local compensation",
        summary: "Housing rises, trust improves, and metro pressure eases, but GDP takes an upfront hit.",
        effects: [
          { stat: "trust", amount: 3 },
          { stat: "cohesion", amount: 2 },
          { stat: "gdp", amount: -5000000000 },
          { stat: "legacyScore", amount: 3 },
        ],
        regionEffects: [
          { regionKey: "eastbridge", stat: "publicServicePressure", amount: -5 },
          { regionKey: "riverglass", stat: "publicServicePressure", amount: -4 },
          { regionKey: "southwatch", stat: "mood", amount: 2 },
        ],
      },
      {
        label: "Leave it to local markets",
        summary: "Budget pain is avoided now, but housing strain deepens and public trust slips.",
        effects: [
          { stat: "trust", amount: -3 },
          { stat: "cohesion", amount: -2 },
          { stat: "legacyScore", amount: -2 },
        ],
        regionEffects: [
          { regionKey: "eastbridge", stat: "publicServicePressure", amount: 4 },
          { regionKey: "riverglass", stat: "economicPressure", amount: 3 },
        ],
      },
    ],
  },
  {
    id: "school_meal_compact",
    turn: 1,
    title: "School Meal Compact",
    description: "A universal school meal and after-class support compact could reduce child stress and strengthen social trust, but critics call it expensive and paternalistic.",
    issueTag: "cost_of_living",
    regionTags: ["southwatch", "riverglass", "north_crown"],
    options: [
      {
        label: "Fund the compact nationally",
        summary: "Education and trust rise, especially in pressured regions, while budget headroom narrows.",
        effects: [
          { stat: "education", amount: 4 },
          { stat: "trust", amount: 3 },
          { stat: "gdp", amount: -3500000000 },
          { stat: "legacyScore", amount: 3 },
        ],
        regionEffects: [
          { regionKey: "southwatch", stat: "mood", amount: 4 },
          { regionKey: "riverglass", stat: "trust", amount: 3 },
          { regionKey: "north_crown", stat: "mood", amount: 2 },
        ],
      },
      {
        label: "Pilot it only in the poorest areas",
        summary: "Some pressure eases, but perceived fairness drops in places left out.",
        effects: [
          { stat: "education", amount: 2 },
          { stat: "trust", amount: -1 },
          { stat: "legacyScore", amount: 1 },
        ],
        regionEffects: [
          { regionKey: "southwatch", stat: "mood", amount: 3 },
          { regionKey: "eastbridge", stat: "trust", amount: -2 },
        ],
      },
    ],
  },
  {
    id: "coastal_grid_renewal",
    turn: 1,
    title: "Coastal Grid Renewal",
    description: "Leoland can modernize coastal energy and grid resilience now, or delay and avoid a bruising political fight.",
    issueTag: "energy_transition",
    regionTags: ["greenfold", "north_crown", "frostmere"],
    options: [
      {
        label: "Invest for resilience now",
        summary: "Environment and long-term legitimacy improve, with near-term fiscal pain.",
        effects: [
          { stat: "environment", amount: 8 },
          { stat: "trust", amount: 2 },
          { stat: "gdp", amount: -6500000000 },
          { stat: "legacyScore", amount: 5 },
        ],
        regionEffects: [
          { regionKey: "greenfold", stat: "mood", amount: 4 },
          { regionKey: "north_crown", stat: "economicPressure", amount: -3 },
          { regionKey: "frostmere", stat: "trust", amount: 2 },
        ],
      },
      {
        label: "Delay and preserve fiscal room",
        summary: "Short-term budgets look calmer, but resilience and climate credibility weaken.",
        effects: [
          { stat: "environment", amount: -4 },
          { stat: "trust", amount: -2 },
          { stat: "legacyScore", amount: -2 },
        ],
        regionEffects: [
          { regionKey: "greenfold", stat: "trust", amount: -4 },
          { regionKey: "north_crown", stat: "mood", amount: -2 },
        ],
      },
    ],
  },
  {
    id: "regional_investment_bank",
    turn: 2,
    title: "Regional Investment Bank",
    description: "A new public investment vehicle could target left-behind regions and clean industry, but opponents fear waste and political favoritism.",
    issueTag: "regional_inequality",
    regionTags: ["southwatch", "north_crown", "riverglass"],
    options: [
      {
        label: "Create it with strict transparency rules",
        summary: "Regional confidence rises if you pair ambition with accountability.",
        effects: [
          { stat: "trust", amount: 3 },
          { stat: "cohesion", amount: 3 },
          { stat: "gdp", amount: 2500000000 },
          { stat: "legacyScore", amount: 4 },
        ],
        regionEffects: [
          { regionKey: "southwatch", stat: "economicPressure", amount: -5 },
          { regionKey: "north_crown", stat: "economicPressure", amount: -3 },
          { regionKey: "riverglass", stat: "mood", amount: 2 },
        ],
      },
      {
        label: "Leave investment to existing markets",
        summary: "You avoid complexity, but regional neglect hardens.",
        effects: [
          { stat: "cohesion", amount: -3 },
          { stat: "trust", amount: -2 },
          { stat: "legacyScore", amount: -2 },
        ],
        regionEffects: [
          { regionKey: "southwatch", stat: "mood", amount: -5 },
          { regionKey: "north_crown", stat: "economicPressure", amount: 3 },
        ],
      },
    ],
  },
  {
    id: "public_media_charter",
    turn: 2,
    title: "Public Media Charter",
    description: "You can reinforce civic media standards and local reporting, or leave a fragmented media market to sort itself out.",
    issueTag: "trust_in_public_institutions",
    regionTags: ["eastbridge", "southwatch", "greenfold"],
    options: [
      {
        label: "Strengthen independent public media",
        summary: "Trust and civic responsibility rise, but some accuse you of elite bias.",
        effects: [
          { stat: "mediaFreedom", amount: 5 },
          { stat: "trust", amount: 3 },
          { stat: "values.civicResponsibility", amount: 4 },
          { stat: "legacyScore", amount: 3 },
        ],
        regionEffects: [
          { regionKey: "eastbridge", stat: "trust", amount: 2 },
          { regionKey: "southwatch", stat: "mood", amount: -1 },
          { regionKey: "greenfold", stat: "trust", amount: 2 },
        ],
      },
      {
        label: "Keep a hands-off approach",
        summary: "You avoid a culture war fight now, but rumor and distrust grow.",
        effects: [
          { stat: "mediaFreedom", amount: -2 },
          { stat: "trust", amount: -3 },
          { stat: "cohesion", amount: -2 },
        ],
        regionEffects: [
          { regionKey: "eastbridge", stat: "trust", amount: -2 },
          { regionKey: "southwatch", stat: "mood", amount: -2 },
          { regionKey: "riverglass", stat: "trust", amount: -2 },
        ],
      },
    ],
  },
  {
    id: "rural_health_access",
    turn: 2,
    title: "Rural Health Access Compact",
    description: "Remote communities want more clinics and telemedicine support, but urban planners argue that the system is already stretched.",
    issueTag: "public_services",
    regionTags: ["frostmere", "riverglass", "north_crown"],
    options: [
      {
        label: "Expand access with telehealth and staffing bonuses",
        summary: "Trust grows in distant regions and cohesion improves, though budgets tighten.",
        effects: [
          { stat: "trust", amount: 2 },
          { stat: "cohesion", amount: 2 },
          { stat: "gdp", amount: -2200000000 },
          { stat: "legacyScore", amount: 2 },
        ],
        regionEffects: [
          { regionKey: "frostmere", stat: "publicServicePressure", amount: -6 },
          { regionKey: "north_crown", stat: "publicServicePressure", amount: -3 },
          { regionKey: "riverglass", stat: "trust", amount: 2 },
        ],
      },
      {
        label: "Concentrate services in major centres",
        summary: "Efficiency arguments win today, but abandonment feelings deepen.",
        effects: [
          { stat: "gdp", amount: 1500000000 },
          { stat: "trust", amount: -3 },
          { stat: "cohesion", amount: -2 },
        ],
        regionEffects: [
          { regionKey: "frostmere", stat: "mood", amount: -4 },
          { regionKey: "north_crown", stat: "trust", amount: -2 },
          { regionKey: "riverglass", stat: "publicServicePressure", amount: 2 },
        ],
      },
    ],
  },
  {
    id: "defence_burden_review",
    turn: 3,
    title: "Defence Burden Review",
    description: "Leoland can raise defence spending and readiness, or redirect part of that money into civil resilience and alliance diplomacy.",
    issueTag: "defence_and_alliance_burden",
    regionTags: ["frostmere", "eastbridge", "southwatch"],
    options: [
      {
        label: "Balance defence with civil resilience",
        summary: "Security remains credible while trust and long-term legitimacy stay healthier.",
        effects: [
          { stat: "globalReputation", amount: 4 },
          { stat: "trust", amount: 2 },
          { stat: "gdp", amount: -1800000000 },
          { stat: "legacyScore", amount: 3 },
        ],
        regionEffects: [
          { regionKey: "frostmere", stat: "mood", amount: 2 },
          { regionKey: "eastbridge", stat: "trust", amount: 2 },
        ],
      },
      {
        label: "Maximise hard defence fast",
        summary: "You look tough quickly, but public patience and social spending room weaken.",
        effects: [
          { stat: "globalReputation", amount: 3 },
          { stat: "trust", amount: -2 },
          { stat: "education", amount: -2 },
          { stat: "legacyScore", amount: -1 },
        ],
        regionEffects: [
          { regionKey: "frostmere", stat: "mood", amount: 3 },
          { regionKey: "southwatch", stat: "publicServicePressure", amount: 3 },
          { regionKey: "greenfold", stat: "trust", amount: -3 },
        ],
      },
    ],
  },
  {
    id: "port_wage_compact",
    turn: 3,
    title: "Port Wage Compact",
    description: "Dockworkers and logistics firms both want certainty. You can broker a wage and retraining compact or let the standoff harden.",
    issueTag: "cost_of_living",
    regionTags: ["north_crown", "riverglass", "southwatch"],
    options: [
      {
        label: "Broker the compact",
        summary: "Trust rises when government looks competent and fair, though business margins tighten.",
        effects: [
          { stat: "trust", amount: 3 },
          { stat: "cohesion", amount: 2 },
          { stat: "gdp", amount: -1200000000 },
          { stat: "legacyScore", amount: 2 },
        ],
        regionEffects: [
          { regionKey: "north_crown", stat: "mood", amount: 4 },
          { regionKey: "riverglass", stat: "economicPressure", amount: -2 },
        ],
      },
      {
        label: "Let the market settle it",
        summary: "You preserve distance, but instability and resentment grow.",
        effects: [
          { stat: "trust", amount: -3 },
          { stat: "cohesion", amount: -2 },
        ],
        regionEffects: [
          { regionKey: "north_crown", stat: "mood", amount: -4 },
          { regionKey: "southwatch", stat: "mood", amount: -2 },
        ],
      },
    ],
  },
  {
    id: "innovation_apprenticeships",
    turn: 3,
    title: "Innovation Apprenticeships",
    description: "Leoland can tie industrial policy to apprenticeships and public research, or chase quick headlines with tax-cut theatre.",
    issueTag: "education",
    regionTags: ["southwatch", "greenfold", "eastbridge"],
    options: [
      {
        label: "Back apprenticeships and research",
        summary: "Education and long-term prosperity rise, but it is slower and less flashy.",
        effects: [
          { stat: "education", amount: 5 },
          { stat: "gdp", amount: 1800000000 },
          { stat: "trust", amount: 2 },
          { stat: "legacyScore", amount: 3 },
        ],
        regionEffects: [
          { regionKey: "southwatch", stat: "economicPressure", amount: -4 },
          { regionKey: "greenfold", stat: "mood", amount: 2 },
          { regionKey: "eastbridge", stat: "trust", amount: 1 },
        ],
      },
      {
        label: "Go for headline tax cuts",
        summary: "You get short-term applause in some quarters, but the structural problem remains.",
        effects: [
          { stat: "gdp", amount: 900000000 },
          { stat: "trust", amount: -1 },
          { stat: "legacyScore", amount: -1 },
        ],
        regionEffects: [
          { regionKey: "southwatch", stat: "economicPressure", amount: 1 },
          { regionKey: "eastbridge", stat: "mood", amount: 1 },
        ],
      },
    ],
  },
  {
    id: "civic_service_year",
    turn: 4,
    title: "Civic Service Year",
    description: "A voluntary national civic service year could strengthen solidarity and skills, but some see it as performative or coercive.",
    issueTag: "trust_in_public_institutions",
    regionTags: ["greenfold", "frostmere", "riverglass"],
    options: [
      {
        label: "Launch it with local choice and support",
        summary: "Trust and cohesion rise when service feels meaningful rather than compulsory.",
        effects: [
          { stat: "trust", amount: 4 },
          { stat: "cohesion", amount: 4 },
          { stat: "values.civicResponsibility", amount: 5 },
          { stat: "legacyScore", amount: 4 },
        ],
        regionEffects: [
          { regionKey: "greenfold", stat: "mood", amount: 3 },
          { regionKey: "frostmere", stat: "trust", amount: 2 },
          { regionKey: "riverglass", stat: "mood", amount: 2 },
        ],
      },
      {
        label: "Skip it and focus on messaging",
        summary: "You save effort now, but institutional trust grows more slowly.",
        effects: [
          { stat: "trust", amount: -2 },
          { stat: "cohesion", amount: -1 },
          { stat: "legacyScore", amount: -1 },
        ],
      },
    ],
  },
  {
    id: "regional_media_fund",
    turn: 4,
    title: "Regional Media Fund",
    description: "Local journalism is thinning out. You can fund regional reporting transparently or accept a thinner civic information landscape.",
    issueTag: "trust_in_public_institutions",
    regionTags: ["north_crown", "southwatch", "riverglass"],
    options: [
      {
        label: "Fund it transparently",
        summary: "Scrutiny improves, and neglected regions feel less invisible.",
        effects: [
          { stat: "mediaFreedom", amount: 4 },
          { stat: "trust", amount: 3 },
          { stat: "legacyScore", amount: 2 },
        ],
        regionEffects: [
          { regionKey: "southwatch", stat: "trust", amount: 3 },
          { regionKey: "north_crown", stat: "mood", amount: 2 },
          { regionKey: "riverglass", stat: "trust", amount: 2 },
        ],
      },
      {
        label: "Leave local media to market forces",
        summary: "Spending stays lower, but rumor and alienation rise.",
        effects: [
          { stat: "trust", amount: -2 },
          { stat: "mediaFreedom", amount: -1 },
        ],
        regionEffects: [
          { regionKey: "southwatch", stat: "mood", amount: -3 },
          { regionKey: "north_crown", stat: "trust", amount: -2 },
        ],
      },
    ],
  },
  {
    id: "harbour_climate_barrier",
    turn: 4,
    title: "Harbour Climate Barrier",
    description: "Storm risk is rising. You can build a costly long-term harbour barrier or patch things gradually and hope the threats stay manageable.",
    issueTag: "energy_transition",
    regionTags: ["north_crown", "riverglass", "eastbridge"],
    options: [
      {
        label: "Build the barrier and adapt early",
        summary: "Expensive now, but it protects trust and resilience later.",
        effects: [
          { stat: "environment", amount: 5 },
          { stat: "trust", amount: 2 },
          { stat: "gdp", amount: -4500000000 },
          { stat: "legacyScore", amount: 4 },
        ],
        regionEffects: [
          { regionKey: "north_crown", stat: "economicPressure", amount: -2 },
          { regionKey: "riverglass", stat: "trust", amount: 2 },
          { regionKey: "eastbridge", stat: "mood", amount: 1 },
        ],
      },
      {
        label: "Patch and postpone",
        summary: "Cash is spared now, but exposed regions feel abandoned.",
        effects: [
          { stat: "environment", amount: -3 },
          { stat: "trust", amount: -2 },
          { stat: "legacyScore", amount: -2 },
        ],
        regionEffects: [
          { regionKey: "north_crown", stat: "mood", amount: -3 },
          { regionKey: "riverglass", stat: "trust", amount: -2 },
        ],
      },
    ],
  },
  {
    id: "youth_voice_council",
    turn: 4,
    title: "Youth Voice Council",
    description: "You can create a real youth advisory council with agenda rights, or keep youth input symbolic and occasional.",
    issueTag: "civic_responsibility",
    regionTags: ["greenfold", "eastbridge", "riverglass"],
    options: [
      {
        label: "Give it real influence",
        summary: "Long-term trust and civic responsibility strengthen, especially among younger voters.",
        effects: [
          { stat: "trust", amount: 3 },
          { stat: "education", amount: 2 },
          { stat: "values.civicResponsibility", amount: 4 },
          { stat: "legacyScore", amount: 3 },
        ],
        regionEffects: [
          { regionKey: "greenfold", stat: "mood", amount: 2 },
          { regionKey: "eastbridge", stat: "trust", amount: 2 },
          { regionKey: "riverglass", stat: "mood", amount: 1 },
        ],
      },
      {
        label: "Keep it symbolic",
        summary: "You avoid risk, but the younger public notices the emptiness.",
        effects: [
          { stat: "trust", amount: -2 },
          { stat: "legacyScore", amount: -1 },
        ],
        regionEffects: [
          { regionKey: "greenfold", stat: "trust", amount: -2 },
          { regionKey: "eastbridge", stat: "mood", amount: -1 },
        ],
      },
    ],
  },
];
