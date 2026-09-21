import { AbstractClass } from "./abstract-class.ts";

export class ConcreteClassB extends AbstractClass {
  protected primitiveOperation1(): string {
    return "ConcreteClassB.primitiveOperation1";
  }

  protected primitiveOperation2(): string {
    return "ConcreteClassB.primitiveOperation2";
  }

  protected override hook(): string {
    return " with hook";
  }
}
