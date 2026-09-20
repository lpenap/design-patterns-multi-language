import { describe, expect, it } from "vitest";
import type { Builder } from "./builder.ts";
import { ConcreteBuilder } from "./concrete-builder.ts";
import { Director } from "./director.ts";
import { Product } from "./product.ts";

describe("Builder", () => {
  it("the director fixes the sequence", () => {
    expect(new Director().construct(new ConcreteBuilder()).describe()).toBe("Product(PartA, PartB)");
  });

  it("a builder alone produces only the requested parts", () => {
    const builder = new ConcreteBuilder();
    expect(builder.getResult().describe()).toBe("Product()");
    builder.buildPartB();
    expect(builder.getResult().describe()).toBe("Product(PartB)");
  });

  it("the same director drives a different representation", () => {
    const product = new Product();
    const shortNames: Builder = {
      buildPartA: () => {
        product.add("A");
      },
      buildPartB: () => {
        product.add("B");
      },
      getResult: () => product,
    };
    expect(new Director().construct(shortNames).describe()).toBe("Product(A, B)");
  });
});
