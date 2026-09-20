import type { AbstractFactory } from "./abstract-factory.ts";
import type { AbstractProductA } from "./abstract-product-a.ts";
import type { AbstractProductB } from "./abstract-product-b.ts";
import { ProductA1 } from "./product-a1.ts";
import { ProductB1 } from "./product-b1.ts";

/** Creates the products of family 1. */
export class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ProductA1();
  }

  createProductB(): AbstractProductB {
    return new ProductB1();
  }
}
