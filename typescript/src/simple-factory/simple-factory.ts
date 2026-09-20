import { ConcreteProductA } from "./concrete-product-a.ts";
import { ConcreteProductB } from "./concrete-product-b.ts";
import type { Product } from "./product.ts";

/** Maps a type code to a concrete product; the single place where products are created. */
export class SimpleFactory {
  // `string`, not `"A" | "B"`: the decision is made on run-time data.
  createProduct(type: string): Product {
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
