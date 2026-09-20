import type { AbstractProductB } from "./abstract-product-b.ts";

export class ProductB1 implements AbstractProductB {
  name(): string {
    return "ProductB1";
  }
}
