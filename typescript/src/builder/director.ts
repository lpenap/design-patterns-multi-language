import type { Builder } from "./builder.ts";
import type { Product } from "./product.ts";

/** Owns the sequence of construction steps; knows nothing of the representation. */
export class Director {
  construct(builder: Builder): Product {
    builder.buildPartA();
    builder.buildPartB();
    return builder.getResult();
  }
}
