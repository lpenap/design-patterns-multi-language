import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { bridgeExample } from "./example.ts";

describe("example", () => {
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
