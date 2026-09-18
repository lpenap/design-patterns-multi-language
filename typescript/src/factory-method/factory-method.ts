/** The interface of the objects the factory method creates. */
export interface Product {
  name(): string;
}

export class ConcreteProductA implements Product {
  name(): string {
    return "ConcreteProductA";
  }
}

export class ConcreteProductB implements Product {
  name(): string {
    return "ConcreteProductB";
  }
}

/** Declares the factory method and calls it from its template operation. */
export abstract class Creator {
  protected abstract factoryMethod(): Product;

  anOperation(): string {
    return `Built ${this.factoryMethod().name()}`;
  }
}

export class ConcreteCreatorA extends Creator {
  protected factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

export class ConcreteCreatorB extends Creator {
  protected factoryMethod(): Product {
    return new ConcreteProductB();
  }
}
