// Memento: capture an object's state so it can be restored, without exposing it.
// #state is private to Memento; the originator reads it through a getter that
// the caretaker, by discipline, never calls (the wide/narrow interface split).

/** The snapshot. */
export class Memento {
  #state;

  constructor(state) {
    this.#state = state;
  }

  /** Wide interface, for the originator only. */
  get state() {
    return this.#state;
  }
}
