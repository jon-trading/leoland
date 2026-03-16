import { finland, decisions } from "./engine/data";
import { runTurn } from "./engine/engine";

console.log(`🌍 Welcome to Leoland v0.1 — Leading: ${finland.name}\n`);

decisions.forEach((d, i) => {
  console.log(`🧭 DECISION ${i + 1}: ${d.title}`);
  console.log(d.description);
  d.options.forEach((opt, idx) => {
    console.log(`  ${idx + 1}. ${opt.label}`);
  });
});

const playerChoices = [
  "Yes, long-term investment",
  "Yes, reshape minds for future"
];

runTurn(finland, playerChoices, decisions);

console.log("\n✅ Updated Country Stats:");
console.log(finland);
