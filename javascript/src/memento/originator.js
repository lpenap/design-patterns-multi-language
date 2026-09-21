import { Memento } from "./memento.js";

/** Creates mementos of its state and restores itself from them. */
export class Originator {
  #state = "";

  setState(state) {
    this.#state = state;
  }

  getState() {
    return this.#state;
  }

  createMemento() {
    return new Memento(this.#state);
  }

  restore(memento) {
    this.#state = memento.state;
  }
}
