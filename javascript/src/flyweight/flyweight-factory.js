import { ConcreteFlyweight } from "./concrete-flyweight.js";

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
