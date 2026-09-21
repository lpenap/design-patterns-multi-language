import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { strategyExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    strategyExample.run(out);
    assert.equal(strategyExample.id, "strategy");
    assert.deepEqual(out.lines, [
      "Executing Strategy Pattern Implementation",
      "  Operation with --> algorithm from ConcreteStrategyA",
      "  Operation with ==> algorithm from ConcreteStrategyB",
    ]);
  });
});
