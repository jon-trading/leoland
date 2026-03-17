import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { parse, stringify } from "yaml";

const INBOX_PATH = path.resolve(__dirname, "..", "data", "contributions", "leo", "leo_ideas_inbox_v1.yaml");

async function main(): Promise<void> {
  const rl = readline.createInterface({ input, output });
  const raw = fs.readFileSync(INBOX_PATH, "utf8");
  const data = (parse(raw) as { ideas?: Array<Record<string, unknown>> }) ?? {};
  const ideas = data.ideas ?? [];

  console.log("\n🦁 Leo workshop mode");
  console.log("This helper adds a new idea to Leo's inbox without touching canonical world seed files.\n");

  const title = (await rl.question("Idea title: ")).trim();
  const kind = (await rl.question("Kind (city_idea / region_idea / club_idea / issue_idea / event_idea): ")).trim() || "world_idea";
  const prompt = (await rl.question("Prompt or note: ")).trim();

  ideas.push({
    title,
    kind,
    prompt,
    status: "inbox",
    added_via: "workshop",
  });

  fs.writeFileSync(INBOX_PATH, stringify({ ideas }), "utf8");
  rl.close();

  console.log(`\nSaved to ${INBOX_PATH}`);
  console.log("Review and promote ideas into canonical seed files deliberately later.");
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
