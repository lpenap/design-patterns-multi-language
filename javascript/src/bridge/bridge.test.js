import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Abstraction } from "./abstraction.js";
import { ConcreteImplementorA } from "./concrete-implementor-a.js";
import { ConcreteImplementorB } from "./concrete-implementor-b.js";
import { RefinedAbstraction } from "./refined-abstraction.js";

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
});
