import type { Product } from "./product.ts";

/** Declares the factory method and calls it from its template operation. */
export abstract class Creator {
  protected abstract factoryMethod(): Product;

  anOperation(): string {
    return `Built ${this.factoryMethod().name()}`;
  }
}
