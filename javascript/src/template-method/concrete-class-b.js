import { AbstractClass } from "./abstract-class.js";

export class ConcreteClassB extends AbstractClass {
  primitiveOperation1() {
    return "ConcreteClassB.primitiveOperation1";
  }

  primitiveOperation2() {
    return "ConcreteClassB.primitiveOperation2";
  }

  hook() {
    return " with hook";
  }
}
