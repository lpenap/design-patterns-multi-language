import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteProductA } from "./concrete-product-a.js";
import { ConcreteProductB } from "./concrete-product-b.js";
import { SimpleFactory } from "./simple-factory.js";

describe("SimpleFactory", () => {
  const factory = new SimpleFactory();

  it("maps type codes to concrete products", () => {
    assert.ok(factory.createProduct("A") instanceof ConcreteProductA);
    assert.ok(factory.createProduct("B") instanceof ConcreteProductB);
    assert.equal(factory.createProduct("A").name(), "ConcreteProductA");
    assert.equal(factory.createProduct("B").name(), "ConcreteProductB");
  });

  it("rejects unknown types", () => {
    assert.throws(() => factory.createProduct("Z"), /Unknown product type: Z/);
  });
});
