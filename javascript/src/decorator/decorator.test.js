import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteComponent } from "./concrete-component.js";
import { ConcreteDecoratorA } from "./concrete-decorator-a.js";
import { ConcreteDecoratorB } from "./concrete-decorator-b.js";
import { Decorator } from "./decorator.js";

describe("Decorator", () => {
  it("adds behaviour around the component", () => {
    assert.equal(new ConcreteDecoratorA(new ConcreteComponent()).operation(), "ConcreteDecoratorA(ConcreteComponent)");
  });

  it("nests in any order and can be applied twice", () => {
    const c = new ConcreteComponent();
    assert.equal(new ConcreteDecoratorB(new ConcreteDecoratorA(c)).operation(), "ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))");
    assert.equal(new ConcreteDecoratorA(new ConcreteDecoratorB(c)).operation(), "ConcreteDecoratorA(ConcreteDecoratorB(ConcreteComponent))");
    assert.equal(new ConcreteDecoratorA(new ConcreteDecoratorA(c)).operation(), "ConcreteDecoratorA(ConcreteDecoratorA(ConcreteComponent))");
  });

  it("base decorator forwards unchanged and is not its component", () => {
    const c = new ConcreteComponent();
    const plain = new Decorator(c);
    assert.equal(plain.operation(), "ConcreteComponent");
    assert.notEqual(plain, c);
  });
});
