import { describe, expect, it } from "vitest";
import { ConcreteComponent } from "./concrete-component.ts";
import { ConcreteDecoratorA } from "./concrete-decorator-a.ts";
import { ConcreteDecoratorB } from "./concrete-decorator-b.ts";

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
});
