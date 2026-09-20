export class ConcretePrototype2 {
  #state;

  constructor(state) {
    this.#state = state;
  }

  clone() {
    return new ConcretePrototype2(this.#state);
  }

  setState(state) {
    this.#state = state;
  }

  describe() {
    return `ConcretePrototype2(state=${this.#state})`;
  }
}
