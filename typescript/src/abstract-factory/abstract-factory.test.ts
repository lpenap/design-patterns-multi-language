import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { type AbstractFactory, ConcreteFactory1, ConcreteFactory2, ProductA1, ProductB2 } from "./abstract-factory.ts";
import { abstractFactoryExample } from "./example.ts";

/** Client code written against the abstract types only. */
const namesFrom = (factory: AbstractFactory): string[] => [factory.createProductA().name(), factory.createProductB().name()];

describe("AbstractFactory", () => {
  it("each factory produces its own family", () => {
    expect(namesFrom(new ConcreteFactory1())).toEqual(["ProductA1", "ProductB1"]);
    expect(namesFrom(new ConcreteFactory2())).toEqual(["ProductA2", "ProductB2"]);
  });

  it("products are of the concrete family classes", () => {
    expect(new ConcreteFactory1().createProductA()).toBeInstanceOf(ProductA1);
    expect(new ConcreteFactory2().createProductB()).toBeInstanceOf(ProductB2);
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    abstractFactoryExample.run(out);
    expect(abstractFactoryExample.id).toBe("abstract-factory");
    expect(out.lines).toEqual(["Executing Abstract Factory Pattern Implementation", "  ProductA1", "  ProductB1", "  ProductA2", "  ProductB2"]);
  });
});
