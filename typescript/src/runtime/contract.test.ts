import { describe, expect, it } from "vitest";
import { BufferOutput, indexExamples } from "./contract.ts";
import { fixtureAlpha, fixtureBeta } from "./fixtures.test-helper.ts";
import { examples } from "./registry.ts";

describe("BufferOutput", () => {
  it("collects lines", () => {
    const out = new BufferOutput();
    fixtureAlpha.run(out);
    expect(out.lines).toEqual(["Executing Fixture Alpha Pattern Implementation", "  first", "  second"]);
  });
});

describe("indexExamples", () => {
  it("sorts by id", () => {
    expect([...indexExamples([fixtureBeta, fixtureAlpha]).keys()]).toEqual(["fixture-alpha", "fixture-beta"]);
  });

  it("rejects duplicate ids", () => {
    expect(() => indexExamples([fixtureAlpha, fixtureAlpha])).toThrow("duplicate example id: fixture-alpha");
  });

  it("production registry holds only kebab-case, non-fixture ids", () => {
    const ids = [...indexExamples(examples).keys()];
    expect(ids).toContain("strategy");
    expect(ids.every((id) => /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id) && !id.startsWith("fixture-"))).toBe(true);
  });
});
