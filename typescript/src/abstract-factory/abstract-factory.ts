import type { AbstractProductA } from "./abstract-product-a.ts";
import type { AbstractProductB } from "./abstract-product-b.ts";

/** Declares one creation operation per abstract product. */
export interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}
