import type { AbstractFactory } from "./abstract-factory.ts";
import type { AbstractProductA } from "./abstract-product-a.ts";
import type { AbstractProductB } from "./abstract-product-b.ts";
import { ProductA2 } from "./product-a2.ts";
import { ProductB2 } from "./product-b2.ts";

/** Creates the products of family 2. */
export class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ProductA2();
  }

  createProductB(): AbstractProductB {
    return new ProductB2();
  }
}
