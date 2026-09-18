import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput, indexExamples } from "./contract.js";
import { fixtureAlpha, fixtureBeta } from "./fixtures.test-helper.js";
import { examples } from "./registry.js";

describe("BufferOutput", () => {
  it("collects lines", () => {
    const out = new BufferOutput();
    fixtureAlpha.run(out);
    assert.deepEqual(out.lines, ["Executing Fixture Alpha Pattern Implementation", "  first", "  second"]);
  });
});

describe("indexExamples", () => {
  it("sorts by id", () => {
    assert.deepEqual([...indexExamples([fixtureBeta, fixtureAlpha]).keys()], ["fixture-alpha", "fixture-beta"]);
  });

  it("rejects duplicate ids", () => {
    assert.throws(() => indexExamples([fixtureAlpha, fixtureAlpha]), /duplicate example id: fixture-alpha/);
  });

  it("production registry holds only kebab-case, non-fixture ids", () => {
    const ids = [...indexExamples(examples).keys()];
    assert.ok(ids.includes("strategy"));
    assert.ok(ids.every((id) => /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id) && !id.startsWith("fixture-")));
  });
});
