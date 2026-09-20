import { ProductA1 } from "./product-a1.js";
import { ProductB1 } from "./product-b1.js";

/** Creates the products of family 1. */
export class ConcreteFactory1 {
  createProductA() {
    return new ProductA1();
  }

  createProductB() {
    return new ProductB1();
  }
}
