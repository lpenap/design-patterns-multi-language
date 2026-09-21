import type { Visitor } from "./visitor.ts";

/** Accepts a visitor and dispatches to the visit method for its own class. */
export interface Element {
  accept(visitor: Visitor): void;
}
