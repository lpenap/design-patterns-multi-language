import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { strategyExample } from "./example.ts";
import { ConcreteStrategyA, ConcreteStrategyB, Context } from "./strategy.ts";

describe("Strategy", () => {
  it("operation delegates to the configured strategy", () => {
    expect(new Context(new ConcreteStrategyA()).operation()).toBe("Operation with --> algorithm from ConcreteStrategyA");
    expect(new Context(new ConcreteStrategyB()).operation()).toBe("Operation with ==> algorithm from ConcreteStrategyB");
  });

  it("switching the strategy changes the next operation", () => {
    const context = new Context(new ConcreteStrategyA());
    context.setStrategy(new ConcreteStrategyB());
    expect(context.operation()).toBe("Operation with ==> algorithm from ConcreteStrategyB");
  });

  it("any structurally matching object is a strategy", () => {
    expect(new Context({ executeAlgorithm: () => "inline" }).operation()).toBe("Operation with inline");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    strategyExample.run(out);
    expect(strategyExample.id).toBe("strategy");
    expect(out.lines).toEqual([
      "Executing Strategy Pattern Implementation",
      "  Operation with --> algorithm from ConcreteStrategyA",
      "  Operation with ==> algorithm from ConcreteStrategyB",
    ]);
  });
});
