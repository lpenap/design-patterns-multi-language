/** Holds the wrapped component and forwards to it; subclasses add behaviour. */
export class Decorator {
  #component;

  constructor(component) {
    this.#component = component;
  }

  operation() {
    return this.#component.operation();
  }
}
