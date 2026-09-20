// Prototype: create new objects by copying a prototypical instance.
// A prototype is any object with `clone()` and `describe()`. JavaScript's own
// object model is prototype-based (Object.create); copying state still needs
// an explicit clone().

/** Copies its own state through the constructor. */
export class ConcretePrototype1 {
  #state;

  constructor(state) {
    this.#state = state;
  }

  clone() {
    return new ConcretePrototype1(this.#state);
  }

  setState(state) {
    this.#state = state;
  }

  describe() {
    return `ConcretePrototype1(state=${this.#state})`;
  }
}
