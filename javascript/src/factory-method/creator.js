/** Declares the factory method and calls it from its template operation. */
export class Creator {
  factoryMethod() {
    throw new Error("ConcreteCreator must implement factoryMethod()");
  }

  anOperation() {
    return `Built ${this.factoryMethod().name()}`;
  }
}
