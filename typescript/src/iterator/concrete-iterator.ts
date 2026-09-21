import type { ConcreteAggregate } from "./concrete-aggregate.ts";
import type { Iterator } from "./iterator.ts";

/** Keeps track of the current position in the traversal. */
export class ConcreteIterator implements Iterator {
  private index = 0;

  constructor(private readonly aggregate: ConcreteAggregate) {}

  hasNext(): boolean {
    return this.index < this.aggregate.count();
  }

  next(): string {
    if (!this.hasNext()) {
      throw new Error("no more elements");
    }
    return this.aggregate.get(this.index++);
  }
}
