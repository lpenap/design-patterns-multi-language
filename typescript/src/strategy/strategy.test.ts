import { describe, expect, it } from "vitest";
import { ConcreteStrategyA } from "./concrete-strategy-a.ts";
import { ConcreteStrategyB } from "./concrete-strategy-b.ts";
import { Context } from "./context.ts";

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
});
