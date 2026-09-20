import type { Product } from "./product.ts";

/** The abstract interface for creating parts of a product. */
export interface Builder {
  buildPartA(): void;
  buildPartB(): void;
  getResult(): Product;
}
