// Adapter (object form): convert an interface into the one the client expects.
// A target is any object with `request()`.

/** An existing class with a useful but incompatible operation. */
export class Adaptee {
  specificRequest() {
    return "Adaptee";
  }
}

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
