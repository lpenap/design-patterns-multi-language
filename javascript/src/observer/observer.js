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

/** Reports the change it was told about through a callback supplied by its creator. */
export class ConcreteObserver {
  #name;
  #report;

  constructor(name, report) {
    this.#name = name;
    this.#report = report;
  }

  update(oldState, newState) {
    this.#report(`${this.#name} notified: state ${oldState} -> ${newState}`);
  }
}
