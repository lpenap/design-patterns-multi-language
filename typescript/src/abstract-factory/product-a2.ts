import type { AbstractProductA } from "./abstract-product-a.ts";

export class ProductA2 implements AbstractProductA {
  name(): string {
    return "ProductA2";
  }
}
