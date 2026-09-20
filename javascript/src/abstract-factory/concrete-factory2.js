import { ProductA2 } from "./product-a2.js";
import { ProductB2 } from "./product-b2.js";

/** Creates the products of family 2. */
export class ConcreteFactory2 {
  createProductA() {
    return new ProductA2();
  }

  createProductB() {
    return new ProductB2();
  }
}
