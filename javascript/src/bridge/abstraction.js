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
