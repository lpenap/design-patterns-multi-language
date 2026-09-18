import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { strategyExample } from "./example.js";
import { ConcreteStrategyA, ConcreteStrategyB, Context } from "./strategy.js";

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
