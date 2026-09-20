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

/** Stores children and delegates the operation to them; child management lives here (safe variant). */
export class Composite {
  #children = [];

  add(child) {
    this.#children.push(child);
    return this;
  }

  operation() {
    return `Composite(${this.#children.map((c) => c.operation()).join("+")})`;
  }
}
