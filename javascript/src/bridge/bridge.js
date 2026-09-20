// Bridge: decouple an abstraction from its implementation so both can vary.
// An implementor is any object with `operationImpl()`.

export class ConcreteImplementorA {
  operationImpl() {
    return "ConcreteImplementorA";
  }
}

export class ConcreteImplementorB {
  operationImpl() {
    return "ConcreteImplementorB";
  }
}

/** Holds the implementor and forwards the primitive operation to it. */
export class Abstraction {
  constructor(implementor) {
    // Not a #private field: RefinedAbstraction needs to reach it.
    this.implementor = implementor;
  }

  operation() {
    return `Abstraction(${this.implementor.operationImpl()})`;
  }
}

/** Extends the abstraction's behaviour without knowing the concrete implementor. */
export class RefinedAbstraction extends Abstraction {
  operation() {
    return `RefinedAbstraction(${this.implementor.operationImpl()})`;
  }
}
