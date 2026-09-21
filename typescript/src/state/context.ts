import type { State } from "./state.ts";

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
