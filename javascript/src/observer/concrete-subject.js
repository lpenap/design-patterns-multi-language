import { Subject } from "./subject.js";

/** Holds the state of interest and notifies when it changes. */
export class ConcreteSubject extends Subject {
  #state = 0;

  getState() {
    return this.#state;
  }

  setState(newState) {
    if (newState === this.#state) {
      return;
    }
    const oldState = this.#state;
    this.#state = newState;
    this.notifyObservers(oldState, newState);
  }
}
