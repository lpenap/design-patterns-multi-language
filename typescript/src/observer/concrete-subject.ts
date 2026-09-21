import { Subject } from "./subject.ts";

/** Holds the state of interest and notifies when it changes. */
export class ConcreteSubject extends Subject {
  private state = 0;

  getState(): number {
    return this.state;
  }

  setState(newState: number): void {
    if (newState === this.state) {
      return;
    }
    const oldState = this.state;
    this.state = newState;
    this.notifyObservers(oldState, newState);
  }
}
