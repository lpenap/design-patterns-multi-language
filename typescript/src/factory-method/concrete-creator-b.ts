import { ConcreteProductB } from "./concrete-product-b.ts";
import { Creator } from "./creator.ts";
import type { Product } from "./product.ts";

export class ConcreteCreatorB extends Creator {
  protected factoryMethod(): Product {
    return new ConcreteProductB();
  }
}
