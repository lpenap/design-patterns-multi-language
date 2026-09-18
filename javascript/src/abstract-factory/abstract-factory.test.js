import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { ConcreteFactory1, ConcreteFactory2, ProductA1, ProductB2 } from "./abstract-factory.js";
import { abstractFactoryExample } from "./example.js";

/** Client code that knows the factory only by its methods. */
const namesFrom = (factory) => [factory.createProductA().name(), factory.createProductB().name()];

describe("AbstractFactory", () => {
  it("each factory produces its own family", () => {
    assert.deepEqual(namesFrom(new ConcreteFactory1()), ["ProductA1", "ProductB1"]);
    assert.deepEqual(namesFrom(new ConcreteFactory2()), ["ProductA2", "ProductB2"]);
  });

  it("products are of the concrete family classes", () => {
    assert.ok(new ConcreteFactory1().createProductA() instanceof ProductA1);
    assert.ok(new ConcreteFactory2().createProductB() instanceof ProductB2);
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    abstractFactoryExample.run(out);
    assert.equal(abstractFactoryExample.id, "abstract-factory");
    assert.deepEqual(out.lines, ["Executing Abstract Factory Pattern Implementation", "  ProductA1", "  ProductB1", "  ProductA2", "  ProductB2"]);
  });
});
