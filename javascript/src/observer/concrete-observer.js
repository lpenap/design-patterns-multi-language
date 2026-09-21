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
