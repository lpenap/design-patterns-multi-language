// Observer: notify dependents automatically when a subject's state changes.
// An observer is any object with `update(oldState, newState)`.

/** Knows its observers and notifies them in attachment order. */
export class Subject {
  #observers = [];

  attach(observer) {
    this.#observers.push(observer);
  }

  detach(observer) {
    const index = this.#observers.indexOf(observer);
    if (index >= 0) {
      this.#observers.splice(index, 1);
    }
  }

  notifyObservers(oldState, newState) {
    for (const observer of [...this.#observers]) {
      observer.update(oldState, newState);
    }
  }
}
