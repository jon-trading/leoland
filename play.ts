import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { starterDeck } from "./engine/data";
import { applyDecision, createGameState, decisionsForTurn, endOfRunAssessment, topRegionHotspots } from "./engine/engine";
import { createPrototypeCountryFromSeed, createPrototypeRegionsFromSeed, loadLeolandCountrySeed, loadLeolandRegionsSeed } from "./engine/seed";
import { Decision, GameState } from "./engine/types";

async function main(): Promise<void> {
  const countrySeed = loadLeolandCountrySeed();
  const regionsSeed = loadLeolandRegionsSeed();
  const state = createGameState(
    createPrototypeCountryFromSeed(countrySeed),
    createPrototypeRegionsFromSeed(regionsSeed),
    4,
  );

  const rl = readline.createInterface({ input, output });

  console.log("\n🌍 Welcome to Leoland v0.3");
  console.log(`${countrySeed.country.name} is a ${countrySeed.country.government_form.split("_").join(" ")} with ${countrySeed.country.population.toLocaleString()} people.`);
  console.log(`Capital: ${countrySeed.country.capital_city} | Major issues: ${countrySeed.country.major_issues.join(", ")}`);
  console.log("\nThis first shell runs four turns. Each turn you choose one policy card and one response. Long-term stewardship should generally beat flashy extraction.\n");

  await rl.question("Press Enter to begin your first term... ");

  while (state.turn <= state.maxTurns) {
    renderTurn(state);
    const turnDeck = decisionsForTurn(starterDeck, state.turn);
    const decision = await chooseDecision(rl, turnDeck);
    const optionIndex = await chooseOption(rl, decision);
    applyDecision(state, decision, optionIndex);
    console.log(`\n✅ You chose: ${decision.options[optionIndex].label}`);
    console.log(`${decision.options[optionIndex].summary}\n`);
  }

  renderEndSummary(state);
  rl.close();
}

function renderTurn(state: GameState): void {
  const { country } = state;
  const hotspots = topRegionHotspots(state.regions).slice(0, 3);
  console.log("\n============================================================");
  console.log(`TURN ${state.turn} / ${state.maxTurns}`);
  console.log(`Trust ${fmt(country.trust)} | Cohesion ${fmt(country.cohesion)} | GDP ${fmtMoney(country.gdp)} | Education ${fmt(country.education)} | Environment ${fmt(country.environment)} | Unrest ${fmt(country.unrest)} | Legacy ${fmt(country.legacyScore)}`);
  console.log("\nRegional hotspots:");
  hotspots.forEach((region) => {
    console.log(`- ${region.name}: trust ${fmt(region.trust)}, mood ${fmt(region.mood)}, econ pressure ${fmt(region.economicPressure)}, service pressure ${fmt(region.publicServicePressure)} | issue ${region.dominantIssue}`);
  });
  console.log("");
}

async function chooseDecision(rl: readline.Interface, decisions: Decision[]): Promise<Decision> {
  console.log("Choose one policy area to act on this turn:");
  decisions.forEach((decision, index) => {
    console.log(`  ${index + 1}. ${decision.title} [${decision.issueTag}]`);
    console.log(`     ${decision.description}`);
    console.log(`     Regions: ${decision.regionTags.join(", ")}`);
  });

  while (true) {
    const answer = await rl.question("\nPolicy card number: ");
    const index = Number.parseInt(answer, 10) - 1;
    if (Number.isInteger(index) && decisions[index]) {
      return decisions[index];
    }
    console.log("Please choose a valid policy card number.");
  }
}

async function chooseOption(rl: readline.Interface, decision: Decision): Promise<number> {
  console.log(`\n${decision.title}`);
  decision.options.forEach((option, index) => {
    console.log(`  ${index + 1}. ${option.label}`);
    console.log(`     ${option.summary}`);
  });

  while (true) {
    const answer = await rl.question("Response option: ");
    const index = Number.parseInt(answer, 10) - 1;
    if (Number.isInteger(index) && decision.options[index]) {
      return index;
    }
    console.log("Please choose a valid response option.");
  }
}

function renderEndSummary(state: GameState): void {
  console.log("\n================ END OF RUN ================");
  console.log(`Legacy score: ${fmt(state.country.legacyScore)}`);
  console.log(`Trust ${fmt(state.country.trust)} | Cohesion ${fmt(state.country.cohesion)} | Unrest ${fmt(state.country.unrest)} | GDP ${fmtMoney(state.country.gdp)}`);
  console.log("\nTurn history:");
  state.history.forEach((entry) => {
    console.log(`- Turn ${entry.turn}: ${entry.decisionTitle} -> ${entry.optionLabel}`);
  });
  console.log(`\n${endOfRunAssessment(state.country)}`);
}

function fmt(value: number): string {
  return value.toFixed(1);
}

function fmtMoney(value: number): string {
  return `€${(value / 1_000_000_000).toFixed(1)}bn`;
}

void main().catch((error) => {
  console.error("\nLeoland could not finish the run.");
  console.error(error);
  process.exitCode = 1;
});
