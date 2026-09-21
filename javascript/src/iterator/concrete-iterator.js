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
