import type { Element } from "./element.ts";
import type { Visitor } from "./visitor.ts";

export class ConcreteElementA implements Element {
  accept(visitor: Visitor): void {
    visitor.visitConcreteElementA(this);
  }

  operationA(): string {
    return "A";
  }
}
