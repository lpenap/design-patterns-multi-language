import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { ConcreteBuilder, Director, Product } from "./builder.js";
import { builderExample } from "./example.js";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    builderExample.run(out);
    assert.equal(builderExample.id, "builder");
    assert.deepEqual(out.lines, [
      "Executing Builder Pattern Implementation",
      "  Director.construct(ConcreteBuilder): Product(PartA, PartB)",
      "  ConcreteBuilder alone, only part B: Product(PartB)",
    ]);
  });
});
