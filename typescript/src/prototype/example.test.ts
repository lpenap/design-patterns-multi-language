import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { prototypeExample } from "./example.ts";

describe("example", () => {
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
