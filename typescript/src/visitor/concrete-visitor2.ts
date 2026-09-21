import type { ConcreteElementA } from "./concrete-element-a.ts";
import type { ConcreteElementB } from "./concrete-element-b.ts";
import type { Visitor } from "./visitor.ts";

/** Concatenates what each element computes. */
export class ConcreteVisitor2 implements Visitor {
  private readonly parts: string[] = [];

  visitConcreteElementA(element: ConcreteElementA): void {
    this.parts.push(element.operationA());
  }

  visitConcreteElementB(element: ConcreteElementB): void {
    this.parts.push(element.operationB());
  }

  result(): string {
    return this.parts.join("+");
  }
}
