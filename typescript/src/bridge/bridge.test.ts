import { describe, expect, it } from "vitest";
import { Abstraction } from "./abstraction.ts";
import { ConcreteImplementorA } from "./concrete-implementor-a.ts";
import { ConcreteImplementorB } from "./concrete-implementor-b.ts";
import { RefinedAbstraction } from "./refined-abstraction.ts";

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
});
