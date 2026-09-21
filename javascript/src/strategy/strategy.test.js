import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteStrategyA } from "./concrete-strategy-a.js";
import { ConcreteStrategyB } from "./concrete-strategy-b.js";
import { Context } from "./context.js";

describe("Strategy", () => {
  it("operation delegates to the configured strategy", () => {
    assert.equal(new Context(new ConcreteStrategyA()).operation(), "Operation with --> algorithm from ConcreteStrategyA");
    assert.equal(new Context(new ConcreteStrategyB()).operation(), "Operation with ==> algorithm from ConcreteStrategyB");
  });

  it("switching the strategy changes the next operation", () => {
    const context = new Context(new ConcreteStrategyA());
    context.setStrategy(new ConcreteStrategyB());
    assert.equal(context.operation(), "Operation with ==> algorithm from ConcreteStrategyB");
  });

  it("any object with executeAlgorithm() is a strategy", () => {
    assert.equal(new Context({ executeAlgorithm: () => "inline" }).operation(), "Operation with inline");
  });
});
