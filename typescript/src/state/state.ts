/** The interface for behaviour associated with one state of the Context. */
export interface State {
  handle(context: Context): void;
  name(): string;
}

export class ConcreteStateA implements State {
  handle(context: Context): void {
    context.setState(new ConcreteStateB());
  }

  name(): string {
    return "ConcreteStateA";
  }
}

export class ConcreteStateB implements State {
  handle(context: Context): void {
    context.setState(new ConcreteStateA());
  }

  name(): string {
    return "ConcreteStateB";
  }
}

/** Holds the current state and delegates state-specific requests to it. */
export class Context {
  constructor(private state: State) {}

  request(): string {
    const before = this.state.name();
    this.state.handle(this);
    return `request() handled by ${before}, now in ${this.state.name()}`;
  }

  setState(state: State): void {
    this.state = state;
  }

  getStateName(): string {
    return this.state.name();
  }
}
