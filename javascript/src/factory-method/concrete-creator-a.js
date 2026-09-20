import { ConcreteProductA } from "./concrete-product-a.js";
import { Creator } from "./creator.js";

export class ConcreteCreatorA extends Creator {
  factoryMethod() {
    return new ConcreteProductA();
  }
}
