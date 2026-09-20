/** The interface for implementation classes: primitive operations only. */
export interface Implementor {
  operationImpl(): string;
}

export class ConcreteImplementorA implements Implementor {
  operationImpl(): string {
    return "ConcreteImplementorA";
  }
}

export class ConcreteImplementorB implements Implementor {
  operationImpl(): string {
    return "ConcreteImplementorB";
  }
}

/** Holds the implementor and forwards the primitive operation to it. */
export class Abstraction {
  constructor(protected readonly implementor: Implementor) {}

  operation(): string {
    return `Abstraction(${this.implementor.operationImpl()})`;
  }
}

/** Extends the abstraction's behaviour without knowing the concrete implementor. */
export class RefinedAbstraction extends Abstraction {
  override operation(): string {
    return `RefinedAbstraction(${this.implementor.operationImpl()})`;
  }
}
