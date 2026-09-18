/** The interface shared by objects that can have responsibilities added. */
export interface Component {
  operation(): string;
}

/** The object being decorated. */
export class ConcreteComponent implements Component {
  operation(): string {
    return "ConcreteComponent";
  }
}

/** Holds the wrapped component and forwards to it; subclasses add behaviour. */
export abstract class Decorator implements Component {
  constructor(private readonly component: Component) {}

  operation(): string {
    return this.component.operation();
  }
}

export class ConcreteDecoratorA extends Decorator {
  override operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

export class ConcreteDecoratorB extends Decorator {
  override operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}
