#!/usr/bin/env bun

import { createInterface } from "readline";
import { execSync } from "child_process";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string): Promise<string> =>
  new Promise((res) => rl.question(q, res));

const TYPES = [
  { key: "1", type: "feat", label: "feat     → new feature (triggers release)" },
  { key: "2", type: "fix", label: "fix      → bug fix (triggers release)" },
  { key: "3", type: "chore", label: "chore    → maintenance, no release" },
  { key: "4", type: "docs", label: "docs     → documentation, no release" },
  { key: "5", type: "refactor", label: "refactor → code change, no release" },
  { key: "6", type: "style", label: "style    → formatting, no release" },
  { key: "7", type: "test", label: "test     → tests, no release" },
];

console.log("\n── Commit Type ──────────────────────────");
TYPES.forEach((t) => console.log(`  ${t.key}. ${t.label}`));
console.log("─────────────────────────────────────────\n");

const typeInput = (await ask("Pick a type (1-7): ")).trim();
const selected = TYPES.find((t) => t.key === typeInput);

if (!selected) {
  console.error("Invalid choice.");
  process.exit(1);
}

const message = (await ask("Commit message: ")).trim();
if (!message) {
  console.error("Message cannot be empty.");
  process.exit(1);
}

const skipCI = (await ask("Skip CI? (y/N): ")).trim().toLowerCase() === "y";
rl.close();

const fullMessage = `${selected.type}: ${message}${skipCI ? " [skip ci]" : ""}`;

console.log(`\nCommit: "${fullMessage}"`);
console.log("Running: git add . && git commit && git push origin main\n");

try {
  execSync("git add .", { stdio: "inherit" });
  execSync(`git commit -m "${fullMessage}"`, { stdio: "inherit" });
  execSync("git push origin main", { stdio: "inherit" });
  console.log("\nDone!");
} catch (e) {
  console.error("\nFailed. Check the error above.");
  process.exit(1);
}
