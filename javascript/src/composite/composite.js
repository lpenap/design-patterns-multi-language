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
