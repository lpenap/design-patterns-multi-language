// State: let an object alter its behaviour when its internal state changes.
// A state is any object with handle(context) and name().

export class ConcreteStateA {
  handle(context) {
    context.setState(new ConcreteStateB());
  }

  name() {
    return "ConcreteStateA";
  }
}

export class ConcreteStateB {
  handle(context) {
    context.setState(new ConcreteStateA());
  }

  name() {
    return "ConcreteStateB";
  }
}

/** Holds the current state and delegates state-specific requests to it. */
export class Context {
  #state;

  constructor(initial) {
    this.#state = initial;
  }

  request() {
    const before = this.#state.name();
    this.#state.handle(this);
    return `request() handled by ${before}, now in ${this.#state.name()}`;
  }

  setState(state) {
    this.#state = state;
  }

  getStateName() {
    return this.#state.name();
  }
}
