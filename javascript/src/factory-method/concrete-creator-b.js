import { ConcreteProductB } from "./concrete-product-b.js";
import { Creator } from "./creator.js";

export class ConcreteCreatorB extends Creator {
  factoryMethod() {
    return new ConcreteProductB();
  }
}
