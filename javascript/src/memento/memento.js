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

/** Keeps mementos safe; never examines their contents. */
export class Caretaker {
  #history = [];

  save(originator) {
    this.#history.push(originator.createMemento());
  }

  /** Restores the most recent saved state; false if nothing was saved. */
  undo(originator) {
    const last = this.#history.pop();
    if (last === undefined) {
      return false;
    }
    originator.restore(last);
    return true;
  }
}
