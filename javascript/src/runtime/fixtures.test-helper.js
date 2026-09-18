// Fixture examples for the runtime tests; never imported by production code.
// Written as closures rather than classes on purpose: an "example" is anything
// with an id and a run method.

export const fixtureAlpha = {
  id: "fixture-alpha",
  run(out) {
    out.line("Executing Fixture Alpha Pattern Implementation");
    out.line("  first");
    out.line("  second");
  },
};

export const fixtureBeta = {
  id: "fixture-beta",
  run(out) {
    out.line("Executing Fixture Beta Pattern Implementation");
  },
};

export const fixtureFailing = {
  id: "fixture-failing",
  run(out) {
    out.line("Executing Fixture Failing Pattern Implementation");
    throw new Error("boom");
  },
};

export const ALPHA = "Executing Fixture Alpha Pattern Implementation\n  first\n  second\n";
export const BETA = "Executing Fixture Beta Pattern Implementation\n";
