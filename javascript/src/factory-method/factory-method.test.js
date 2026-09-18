import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { factoryMethodExample } from "./example.js";
import { ConcreteCreatorA, ConcreteCreatorB, Creator } from "./factory-method.js";

describe("FactoryMethod", () => {
  it("each concrete creator builds its own product", () => {
    assert.equal(new ConcreteCreatorA().anOperation(), "Built ConcreteProductA");
    assert.equal(new ConcreteCreatorB().anOperation(), "Built ConcreteProductB");
  });

  it("template operation uses whatever the subclass returns", () => {
    class CustomCreator extends Creator {
      factoryMethod() {
        return { name: () => "Custom" };
      }
    }
    assert.equal(new CustomCreator().anOperation(), "Built Custom");
  });

  it("a creator without factoryMethod() fails at the first call", () => {
    assert.throws(() => new Creator().anOperation(), /must implement factoryMethod/);
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    factoryMethodExample.run(out);
    assert.equal(factoryMethodExample.id, "factory-method");
    assert.deepEqual(out.lines, ["Executing Factory Method Pattern Implementation", "  Built ConcreteProductA", "  Built ConcreteProductB"]);
  });
});
