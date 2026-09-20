import type { AbstractProductA } from "./abstract-product-a.ts";

export class ProductA1 implements AbstractProductA {
  name(): string {
    return "ProductA1";
  }
}
