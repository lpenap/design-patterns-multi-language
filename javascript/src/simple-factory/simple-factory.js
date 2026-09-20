import { ConcreteProductA } from "./concrete-product-a.js";
import { ConcreteProductB } from "./concrete-product-b.js";

/** Maps a type code to a concrete product; the single place where products are created. */
export class SimpleFactory {
  createProduct(type) {
    switch (type) {
      case "A":
        return new ConcreteProductA();
      case "B":
        return new ConcreteProductB();
      default:
        throw new Error(`Unknown product type: ${type}`);
    }
  }
}
