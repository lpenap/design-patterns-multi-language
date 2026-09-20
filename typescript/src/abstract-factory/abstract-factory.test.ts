import { describe, expect, it } from "vitest";
import type { AbstractFactory } from "./abstract-factory.ts";
import { ConcreteFactory1 } from "./concrete-factory1.ts";
import { ConcreteFactory2 } from "./concrete-factory2.ts";
import { ProductA1 } from "./product-a1.ts";
import { ProductB2 } from "./product-b2.ts";

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
});
