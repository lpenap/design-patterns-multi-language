// Iterator: access an aggregate's elements sequentially without exposing its representation.
// An iterator is any object with hasNext() and next(); an aggregate any object with createIterator().

/** Holds the items and hands out iterators over them. */
export class ConcreteAggregate {
  #items = [];

  add(item) {
    this.#items.push(item);
  }

  count() {
    return this.#items.length;
  }

  /** Access for the iterator; the array itself is never exposed. */
  get(index) {
    return this.#items[index];
  }

  createIterator() {
    return new ConcreteIterator(this);
  }
}

/** Keeps track of the current position in the traversal. */
export class ConcreteIterator {
  #aggregate;
  #index = 0;

  constructor(aggregate) {
    this.#aggregate = aggregate;
  }

  hasNext() {
    return this.#index < this.#aggregate.count();
  }

  next() {
    if (!this.hasNext()) {
      throw new Error("no more elements");
    }
    return this.#aggregate.get(this.#index++);
  }
}
