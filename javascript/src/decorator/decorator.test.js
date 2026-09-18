import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { ConcreteComponent, ConcreteDecoratorA, ConcreteDecoratorB, Decorator } from "./decorator.js";
import { decoratorExample } from "./example.js";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    decoratorExample.run(out);
    assert.equal(decoratorExample.id, "decorator");
    assert.deepEqual(out.lines, [
      "Executing Decorator Pattern Implementation",
      "  ConcreteDecoratorA(ConcreteComponent)",
      "  ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))",
    ]);
  });
});
