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
