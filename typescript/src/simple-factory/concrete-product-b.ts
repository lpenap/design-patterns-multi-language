import type { Product } from "./product.ts";

export class ConcreteProductB implements Product {
  name(): string {
    return "ConcreteProductB";
  }
}
