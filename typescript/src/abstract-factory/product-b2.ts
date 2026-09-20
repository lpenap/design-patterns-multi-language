import type { AbstractProductB } from "./abstract-product-b.ts";

export class ProductB2 implements AbstractProductB {
  name(): string {
    return "ProductB2";
  }
}
