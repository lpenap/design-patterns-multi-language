// Composite: treat individual objects and compositions uniformly.
// A component is any object with `operation()`.

/** A primitive with no children. */
export class Leaf {
  #name;

  constructor(name) {
    this.#name = name;
  }

  operation() {
    return `Leaf(${this.#name})`;
  }
}
