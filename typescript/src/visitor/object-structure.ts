import type { Element } from "./element.ts";
import type { Visitor } from "./visitor.ts";

/** Enumerates its elements and lets a visitor visit each. */
export class ObjectStructure {
  private readonly elements: Element[] = [];

  add(element: Element): void {
    this.elements.push(element);
  }

  accept(visitor: Visitor): void {
    for (const element of this.elements) {
      element.accept(visitor);
    }
  }
}
