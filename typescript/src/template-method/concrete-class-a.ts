import { AbstractClass } from "./abstract-class.ts";

export class ConcreteClassA extends AbstractClass {
  protected primitiveOperation1(): string {
    return "ConcreteClassA.primitiveOperation1";
  }

  protected primitiveOperation2(): string {
    return "ConcreteClassA.primitiveOperation2";
  }
}
