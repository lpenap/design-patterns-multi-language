import type { Builder } from "./builder.ts";
import { Product } from "./product.ts";

/** Assembles the parts into one representation and hands it out. */
export class ConcreteBuilder implements Builder {
  private readonly product = new Product();

  buildPartA(): void {
    this.product.add("PartA");
  }

  buildPartB(): void {
    this.product.add("PartB");
  }

  getResult(): Product {
    return this.product;
  }
}
