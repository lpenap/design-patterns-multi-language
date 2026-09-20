import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { Abstraction, ConcreteImplementorA, ConcreteImplementorB, RefinedAbstraction } from "./bridge.js";
import { bridgeExample } from "./example.js";

describe("Bridge", () => {
  it("any abstraction works with any implementor", () => {
    assert.equal(new Abstraction(new ConcreteImplementorA()).operation(), "Abstraction(ConcreteImplementorA)");
    assert.equal(new Abstraction(new ConcreteImplementorB()).operation(), "Abstraction(ConcreteImplementorB)");
    assert.equal(new RefinedAbstraction(new ConcreteImplementorA()).operation(), "RefinedAbstraction(ConcreteImplementorA)");
    assert.equal(new RefinedAbstraction(new ConcreteImplementorB()).operation(), "RefinedAbstraction(ConcreteImplementorB)");
  });

  it("a new implementor needs no change on the abstraction side", () => {
    const custom = { operationImpl: () => "Custom" };
    assert.equal(new Abstraction(custom).operation(), "Abstraction(Custom)");
    assert.equal(new RefinedAbstraction(custom).operation(), "RefinedAbstraction(Custom)");
  });

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
