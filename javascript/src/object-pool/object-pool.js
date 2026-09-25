import { Reusable } from "./reusable.js";

/**
 * Lends out up to `capacity` reusable objects, creating each one only on
 * first demand and recycling released ones in FIFO order.
 */
export class ObjectPool {
  #capacity;
  #idle = [];
  #lent = new Set();
  #created = 0;

  constructor(capacity) {
    if (capacity < 1) {
      throw new Error(`capacity must be positive: ${capacity}`);
    }
    this.#capacity = capacity;
  }

  /**
   * Hands out an idle object, or a new one while the pool is below capacity.
   * @throws Error when every object is in use
   */
  acquire(task) {
    let reusable = this.#idle.shift();
    if (reusable === undefined) {
      if (this.#created === this.#capacity) {
        throw new Error(`pool exhausted, ${this.#lent.size} of ${this.#capacity} in use`);
      }
      this.#created += 1;
      reusable = new Reusable(this.#created);
    }
    reusable.assign(task);
    this.#lent.add(reusable);
    return reusable;
  }

  /**
   * Takes an object back, resets it and makes it available again.
   * @throws Error when the object was not lent out by this pool
   */
  release(reusable) {
    if (!this.#lent.delete(reusable)) {
      throw new Error(`${reusable} is not in use`);
    }
    reusable.reset();
    this.#idle.push(reusable);
  }

  get capacity() {
    return this.#capacity;
  }

  get created() {
    return this.#created;
  }

  get available() {
    return this.#idle.length;
  }

  get inUse() {
    return this.#lent.size;
  }
}
