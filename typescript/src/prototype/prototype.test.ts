import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { prototypeExample } from "./example.ts";
import { ConcretePrototype1, ConcretePrototype2, type Prototype } from "./prototype.ts";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    prototypeExample.run(out);
    expect(prototypeExample.id).toBe("prototype");
    expect(out.lines).toEqual([
      "Executing Prototype Pattern Implementation",
      "  Original: ConcretePrototype1(state=alpha)",
      "  Clone: ConcretePrototype1(state=alpha)",
      "  Clone is a distinct object: true",
      "  Clone after setState(beta): ConcretePrototype1(state=beta)",
      "  Original after the clone changed: ConcretePrototype1(state=alpha)",
      "  ConcretePrototype2 clone: ConcretePrototype2(state=gamma)",
    ]);
  });
});
