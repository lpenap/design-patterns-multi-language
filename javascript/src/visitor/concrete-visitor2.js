/** Concatenates what each element computes. */
export class ConcreteVisitor2 {
  #parts = [];

  visitConcreteElementA(element) {
    this.#parts.push(element.operationA());
  }

  visitConcreteElementB(element) {
    this.#parts.push(element.operationB());
  }

  result() {
    return this.#parts.join("+");
  }
}
