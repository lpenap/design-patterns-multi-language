import { describe, expect, it } from "vitest";
import { ConcretePrototype1 } from "./concrete-prototype1.ts";
import { ConcretePrototype2 } from "./concrete-prototype2.ts";
import type { Prototype } from "./prototype.ts";

describe("Prototype", () => {
  it("a clone is a distinct object with equal state", () => {
    const original = new ConcretePrototype1("x");
    const clone = original.clone();
    expect(clone).not.toBe(original);
    expect(clone.describe()).toBe(original.describe());
  });

  it("changing the clone leaves the original untouched", () => {
    const original = new ConcretePrototype2("x");
    const clone = original.clone();
    clone.setState("y");
    expect(original.describe()).toBe("ConcretePrototype2(state=x)");
    expect(clone.describe()).toBe("ConcretePrototype2(state=y)");
  });

  it("cloning through the interface preserves the concrete class", () => {
    const prototypes: Prototype[] = [new ConcretePrototype1("a"), new ConcretePrototype2("b")];
    expect(prototypes[0]?.clone()).toBeInstanceOf(ConcretePrototype1);
    expect(prototypes[1]?.clone()).toBeInstanceOf(ConcretePrototype2);
  });
});
