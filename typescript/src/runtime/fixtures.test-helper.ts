import type { Example } from "./contract.ts";

/** Fixture examples for the runtime tests; never imported by production code. */
export const fixtureAlpha: Example = {
  id: "fixture-alpha",
  run(out) {
    out.line("Executing Fixture Alpha Pattern Implementation");
    out.line("  first");
    out.line("  second");
  },
};

export const fixtureBeta: Example = {
  id: "fixture-beta",
  run(out) {
    out.line("Executing Fixture Beta Pattern Implementation");
  },
};

export const fixtureFailing: Example = {
  id: "fixture-failing",
  run(out) {
    out.line("Executing Fixture Failing Pattern Implementation");
    throw new Error("boom");
  },
};

export const ALPHA = "Executing Fixture Alpha Pattern Implementation\n  first\n  second\n";
export const BETA = "Executing Fixture Beta Pattern Implementation\n";
