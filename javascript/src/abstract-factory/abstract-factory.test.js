import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteFactory1 } from "./concrete-factory1.js";
import { ConcreteFactory2 } from "./concrete-factory2.js";
import { ProductA1 } from "./product-a1.js";
import { ProductB2 } from "./product-b2.js";

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
});
