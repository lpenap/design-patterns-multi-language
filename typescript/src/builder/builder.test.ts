import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { type Builder, ConcreteBuilder, Director, Product } from "./builder.ts";
import { builderExample } from "./example.ts";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    builderExample.run(out);
    expect(builderExample.id).toBe("builder");
    expect(out.lines).toEqual([
      "Executing Builder Pattern Implementation",
      "  Director.construct(ConcreteBuilder): Product(PartA, PartB)",
      "  ConcreteBuilder alone, only part B: Product(PartB)",
    ]);
  });
});
