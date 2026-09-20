import { ConcreteProductA } from "./concrete-product-a.ts";
import { Creator } from "./creator.ts";
import type { Product } from "./product.ts";

export class ConcreteCreatorA extends Creator {
  protected factoryMethod(): Product {
    return new ConcreteProductA();
  }
}
