export class BoundedBuffer {
  #capacity;
  #items = [];
  #operations = 0;

  constructor(capacity) {
    this.#capacity = capacity;
  }

  /** Number of completed puts and takes; the scheduler uses it to detect progress. */
  get operationCount() {
    return this.#operations;
  }

  /** Waits (yields) while the buffer is full, then appends the item. */
  *put(item) {
    while (this.#items.length >= this.#capacity) {
      yield;
    }
    this.#items.push(item);
    this.#operations++;
  }

  /** Waits (yields) while the buffer is empty, then removes the oldest item. */
  *take() {
    while (this.#items.length === 0) {
      yield;
    }
    this.#operations++;
    return this.#items.shift();
  }

  size() {
    return this.#items.length;
  }
}
