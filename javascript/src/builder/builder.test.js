import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteBuilder } from "./concrete-builder.js";
import { Director } from "./director.js";
import { Product } from "./product.js";

describe("Builder", () => {
  it("the director fixes the sequence", () => {
    assert.equal(new Director().construct(new ConcreteBuilder()).describe(), "Product(PartA, PartB)");
  });

  it("a builder alone produces only the requested parts", () => {
    const builder = new ConcreteBuilder();
    assert.equal(builder.getResult().describe(), "Product()");
    builder.buildPartB();
    assert.equal(builder.getResult().describe(), "Product(PartB)");
  });

  it("the same director drives a different representation", () => {
    const product = new Product();
    const shortNames = {
      buildPartA: () => product.add("A"),
      buildPartB: () => product.add("B"),
      getResult: () => product,
    };
    assert.equal(new Director().construct(shortNames).describe(), "Product(A, B)");
  });
});
