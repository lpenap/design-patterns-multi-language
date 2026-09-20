/** Implements the target's `request()` by delegating to the adaptee it holds. */
export class Adapter {
  #adaptee;

  constructor(adaptee) {
    this.#adaptee = adaptee;
  }

  request() {
    return `Adapter(${this.#adaptee.specificRequest()})`;
  }
}
