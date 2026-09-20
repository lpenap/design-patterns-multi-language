/** The interface for accessing and traversing elements. */
export interface Iterator {
  hasNext(): boolean;
  next(): string;
}

/** The interface for creating an Iterator object. */
export interface Aggregate {
  createIterator(): Iterator;
}

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
