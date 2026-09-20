import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { Abstraction, ConcreteImplementorA, ConcreteImplementorB, RefinedAbstraction } from "./bridge.ts";
import { bridgeExample } from "./example.ts";

describe("Bridge", () => {
  it("any abstraction works with any implementor", () => {
    expect(new Abstraction(new ConcreteImplementorA()).operation()).toBe("Abstraction(ConcreteImplementorA)");
    expect(new Abstraction(new ConcreteImplementorB()).operation()).toBe("Abstraction(ConcreteImplementorB)");
    expect(new RefinedAbstraction(new ConcreteImplementorA()).operation()).toBe("RefinedAbstraction(ConcreteImplementorA)");
    expect(new RefinedAbstraction(new ConcreteImplementorB()).operation()).toBe("RefinedAbstraction(ConcreteImplementorB)");
  });

  it("a new implementor needs no change on the abstraction side", () => {
    const custom = { operationImpl: () => "Custom" };
    expect(new Abstraction(custom).operation()).toBe("Abstraction(Custom)");
    expect(new RefinedAbstraction(custom).operation()).toBe("RefinedAbstraction(Custom)");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    bridgeExample.run(out);
    expect(bridgeExample.id).toBe("bridge");
    expect(out.lines).toEqual([
      "Executing Bridge Pattern Implementation",
      "  Abstraction(ConcreteImplementorA)",
      "  Abstraction(ConcreteImplementorB)",
      "  RefinedAbstraction(ConcreteImplementorA)",
      "  RefinedAbstraction(ConcreteImplementorB)",
    ]);
  });
});
