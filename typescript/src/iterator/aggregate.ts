import type { Iterator } from "./iterator.ts";

/** The interface for creating an Iterator object. */
export interface Aggregate {
  createIterator(): Iterator;
}
