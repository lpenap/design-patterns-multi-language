import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { ConcreteComponent, ConcreteDecoratorA, ConcreteDecoratorB } from "./decorator.ts";
import { decoratorExample } from "./example.ts";

describe("Decorator", () => {
  it("adds behaviour around the component", () => {
    expect(new ConcreteDecoratorA(new ConcreteComponent()).operation()).toBe("ConcreteDecoratorA(ConcreteComponent)");
  });

  it("nests in any order and can be applied twice", () => {
    const c = new ConcreteComponent();
    expect(new ConcreteDecoratorB(new ConcreteDecoratorA(c)).operation()).toBe("ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))");
    expect(new ConcreteDecoratorA(new ConcreteDecoratorB(c)).operation()).toBe("ConcreteDecoratorA(ConcreteDecoratorB(ConcreteComponent))");
    expect(new ConcreteDecoratorA(new ConcreteDecoratorA(c)).operation()).toBe("ConcreteDecoratorA(ConcreteDecoratorA(ConcreteComponent))");
  });

  it("a decorator is not its component", () => {
    const c = new ConcreteComponent();
    expect(new ConcreteDecoratorA(c)).not.toBe(c);
  });

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
