import { readdirSync } from "node:fs";
import { defineConfig } from "vitest/config";

// The coverage gate (constitution VI: > 90 % lines and branches) engages as
// soon as the first test file exists; on an empty project there is nothing to
// measure and vitest would otherwise fail the threshold on 0/0.
const hasTests = readdirSync("src", { recursive: true }).some((f) =>
  String(f).endsWith(".test.ts"),
);

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      // Only the CLI entry point may be excluded (constitution VI).
      exclude: ["src/**/*.test.ts", "src/**/*.test-helper.ts", "src/cli.ts"],
      ...(hasTests ? { thresholds: { lines: 90, branches: 90 } } : {}),
    },
  },
});
