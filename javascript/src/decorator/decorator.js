// Decorator: attach responsibilities to an object dynamically by wrapping it.
// A component is any object with `operation()`.

/** The object being decorated. */
export class ConcreteComponent {
  operation() {
    return "ConcreteComponent";
  }
}

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

export class ConcreteDecoratorA extends Decorator {
  operation() {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

export class ConcreteDecoratorB extends Decorator {
  operation() {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}
