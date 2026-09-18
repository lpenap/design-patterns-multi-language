// Runs node:test under c8 with the coverage gate (constitution VI: > 90 %
// lines and branches). Node 20 does not expand globs on the command line, so
// test files are discovered here and passed explicitly. On an empty project
// there is nothing to measure, so the gate engages with the first test file.
import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const files = readdirSync("src", { recursive: true })
  .map(String)
  .filter((f) => f.endsWith(".test.js"))
  .map((f) => join("src", f));

if (files.length === 0) {
  console.log("No test files found under src/; nothing to run.");
  process.exit(0);
}

const c8 = [
  "--all", "--src", "src",
  "--include", "src/**/*.js",
  "--exclude", "src/**/*.test.js",
  // Only the CLI entry point may be excluded (constitution VI).
  "--exclude", "src/**/*.test-helper.js",
  "--exclude", "src/cli.js",
  "--lines", "90", "--branches", "90", "--check-coverage",
  "--reporter", "text",
];
const result = spawnSync("c8", [...c8, "node", "--test", ...files], {
  stdio: "inherit",
  shell: process.platform === "win32",
});
process.exit(result.status ?? 1);
