import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { decoratorExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    decoratorExample.run(out);
    expect(decoratorExample.id).toBe("decorator");
    expect(out.lines).toEqual([
      "Executing Decorator Pattern Implementation",
      "  ConcreteDecoratorA(ConcreteComponent)",
      "  ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))",
    ]);
  });
});
