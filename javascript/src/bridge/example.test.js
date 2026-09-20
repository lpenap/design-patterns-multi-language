import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { bridgeExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    bridgeExample.run(out);
    assert.equal(bridgeExample.id, "bridge");
    assert.deepEqual(out.lines, [
      "Executing Bridge Pattern Implementation",
      "  Abstraction(ConcreteImplementorA)",
      "  Abstraction(ConcreteImplementorB)",
      "  RefinedAbstraction(ConcreteImplementorA)",
      "  RefinedAbstraction(ConcreteImplementorB)",
    ]);
  });
});
