import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

import { Country, RegionState } from "./types";

export interface LeolandCountrySeed {
  country: {
    name: string;
    short_description: string;
    geography: string;
    eu_membership: boolean;
    population: number;
    electorate: number;
    capital_city: string;
    major_cities: string[];
    provinces_or_states: number;
    province_names: string[];
    government_form: string;
    legislature_name: string;
    party_system: string;
    major_parties: string[];
    economy_scale: string;
    headline_sectors: string[];
    military_posture: string;
    major_issues: string[];
    voting_demographics: Record<string, string>;
    notes: string[];
  };
}

export interface LeolandRegionsSeed {
  regions: Array<{
    key: string;
    name: string;
    capital: string;
    identity: string;
    club_anchor: string;
    trust_tendency: number;
    economic_pressure: number;
    public_service_pressure: number;
    political_temperament: string;
    dominant_issue: string;
  }>;
}

const COUNTRY_SEED_PATH = path.resolve(__dirname, "..", "data", "universe", "leoland_country_seed_v1.yaml");
const REGIONS_SEED_PATH = path.resolve(__dirname, "..", "data", "universe", "leoland_regions_seed_v1.yaml");

export function loadLeolandCountrySeed(): LeolandCountrySeed {
  return parse(fs.readFileSync(COUNTRY_SEED_PATH, "utf8")) as LeolandCountrySeed;
}

export function loadLeolandRegionsSeed(): LeolandRegionsSeed {
  return parse(fs.readFileSync(REGIONS_SEED_PATH, "utf8")) as LeolandRegionsSeed;
}

export function createPrototypeCountryFromSeed(seed: LeolandCountrySeed): Country {
  const population = seed.country.population;
  const economyScale = seed.country.economy_scale.toLowerCase();
  const gdp =
    economyScale === "large"
      ? 8_200_000_000_000
      : economyScale === "medium"
        ? 2_400_000_000_000
        : 900_000_000_000;

  return {
    id: "LEO",
    name: seed.country.name,
    leader: {
      name: "Caretaker Cabinet",
      charisma: 58,
      integrity: 78,
      strategicVision: 72,
      ego: 24,
    },
    population,
    gdp,
    trust: 63,
    cohesion: 57,
    environment: 61,
    mediaFreedom: 74,
    education: 71,
    globalReputation: 68,
    unrest: 19,
    legacyScore: 0,
    values: {
      capitalism: 57,
      collectivism: 49,
      nationalism: 45,
      globalism: 63,
      populism: 41,
      civicResponsibility: 72,
    },
  };
}

export function createPrototypeRegionsFromSeed(seed: LeolandRegionsSeed): RegionState[] {
  return seed.regions.map((region) => ({
    key: region.key,
    name: region.name,
    capital: region.capital,
    identity: region.identity,
    clubAnchor: region.club_anchor,
    dominantIssue: region.dominant_issue,
    politicalTemperament: region.political_temperament,
    trust: region.trust_tendency,
    mood: 58,
    economicPressure: region.economic_pressure,
    publicServicePressure: region.public_service_pressure,
  }));
}
