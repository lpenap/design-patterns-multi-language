// Flyweight: share fine-grained objects; keep the varying state outside them.
// A flyweight is any object with `operation(extrinsicState)`.

/** Stores intrinsic state; immutable, therefore sharable. */
export class ConcreteFlyweight {
  #intrinsicState;

  constructor(intrinsicState) {
    this.#intrinsicState = intrinsicState;
  }

  operation(extrinsicState) {
    return `ConcreteFlyweight(${this.#intrinsicState}) with extrinsic state ${extrinsicState}`;
  }
}

/** Creates flyweights on first request and returns the existing one afterwards. */
export class FlyweightFactory {
  #pool = new Map();

  getFlyweight(key) {
    if (!this.#pool.has(key)) {
      this.#pool.set(key, new ConcreteFlyweight(key));
    }
    return this.#pool.get(key);
  }

  count() {
    return this.#pool.size;
  }
}
