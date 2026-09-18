import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { simpleFactoryExample } from "./example.js";
import { ConcreteProductA, ConcreteProductB, SimpleFactory } from "./simple-factory.js";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    simpleFactoryExample.run(out);
    assert.equal(simpleFactoryExample.id, "simple-factory");
    assert.deepEqual(out.lines, ["Executing Simple Factory Pattern Implementation", "  ConcreteProductA", "  ConcreteProductB"]);
  });
});
