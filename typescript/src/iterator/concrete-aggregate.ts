import type { Aggregate } from "./aggregate.ts";
import { ConcreteIterator } from "./concrete-iterator.ts";
import type { Iterator } from "./iterator.ts";

/** Holds the items and hands out iterators over them. */
export class ConcreteAggregate implements Aggregate {
  private readonly items: string[] = [];

  add(item: string): void {
    this.items.push(item);
  }

  count(): number {
    return this.items.length;
  }

  /** Access for the iterator; the array itself is never exposed. */
  get(index: number): string {
    const item = this.items[index];
    if (item === undefined) {
      throw new RangeError(`no element at ${String(index)}`);
    }
    return item;
  }

  createIterator(): Iterator {
    return new ConcreteIterator(this);
  }
}
