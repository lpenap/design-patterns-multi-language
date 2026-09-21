import type { Element } from "./element.ts";
import type { Visitor } from "./visitor.ts";

export class ConcreteElementB implements Element {
  accept(visitor: Visitor): void {
    visitor.visitConcreteElementB(this);
  }

  operationB(): string {
    return "B";
  }
}
