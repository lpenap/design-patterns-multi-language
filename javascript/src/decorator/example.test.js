import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { decoratorExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    decoratorExample.run(out);
    assert.equal(decoratorExample.id, "decorator");
    assert.deepEqual(out.lines, [
      "Executing Decorator Pattern Implementation",
      "  ConcreteDecoratorA(ConcreteComponent)",
      "  ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))",
    ]);
  });
});
