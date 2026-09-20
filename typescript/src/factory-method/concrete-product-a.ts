import type { Product } from "./product.ts";

export class ConcreteProductA implements Product {
  name(): string {
    return "ConcreteProductA";
  }
}
