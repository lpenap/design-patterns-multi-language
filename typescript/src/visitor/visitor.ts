import type { ConcreteElementA } from "./concrete-element-a.ts";
import type { ConcreteElementB } from "./concrete-element-b.ts";

/** One visit operation per concrete element class. */
export interface Visitor {
  visitConcreteElementA(element: ConcreteElementA): void;
  visitConcreteElementB(element: ConcreteElementB): void;
}
