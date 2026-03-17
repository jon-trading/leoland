import { prototypeDecisions } from "./engine/data";
import { runTurn } from "./engine/engine";
import { createPrototypeCountryFromSeed, loadLeolandCountrySeed } from "./engine/seed";

const seed = loadLeolandCountrySeed();
const leoland = createPrototypeCountryFromSeed(seed);

console.log(`🌍 Welcome to Leoland v0.2 — Leading: ${leoland.name}\n`);
console.log(`🏛️ Capital: ${seed.country.capital_city}`);
console.log(`🗳️ System: ${seed.country.government_form.split("_").join(" ")}`);
console.log(`👥 Population: ${seed.country.population.toLocaleString()}`);
console.log(`🧩 Major issues: ${seed.country.major_issues.slice(0, 3).join(", ")}\n`);

prototypeDecisions.forEach((decision, index) => {
  console.log(`🧭 DECISION ${index + 1}: ${decision.title}`);
  console.log(decision.description);
  decision.options.forEach((option, optionIndex) => {
    console.log(`  ${optionIndex + 1}. ${option.label}`);
  });
});

const playerChoices = [
  "Yes, invest for resilience",
  "Yes, teach judgment early",
];

runTurn(leoland, playerChoices, prototypeDecisions);

console.log("\n✅ Updated Country Stats:");
console.log(leoland);
