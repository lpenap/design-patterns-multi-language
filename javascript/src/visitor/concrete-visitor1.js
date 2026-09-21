/** Records which element classes it visited. */
export class ConcreteVisitor1 {
  #visited = [];

  visitConcreteElementA() {
    this.#visited.push("visited ConcreteElementA");
  }

  visitConcreteElementB() {
    this.#visited.push("visited ConcreteElementB");
  }

  result() {
    return this.#visited.join(", ");
  }
}
