// Factory Method: let subclasses decide which class to instantiate.
//
// A product is any object with `name()`. There are no abstract methods in
// JavaScript, so the base `factoryMethod()` throws: forgetting the override
// fails at the first call instead of at definition time.

export class ConcreteProductA {
  name() {
    return "ConcreteProductA";
  }
}

export class ConcreteProductB {
  name() {
    return "ConcreteProductB";
  }
}

/** Declares the factory method and calls it from its template operation. */
export class Creator {
  factoryMethod() {
    throw new Error("ConcreteCreator must implement factoryMethod()");
  }

  anOperation() {
    return `Built ${this.factoryMethod().name()}`;
  }
}

export class ConcreteCreatorA extends Creator {
  factoryMethod() {
    return new ConcreteProductA();
  }
}

export class ConcreteCreatorB extends Creator {
  factoryMethod() {
    return new ConcreteProductB();
  }
}
