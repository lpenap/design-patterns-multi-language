// Visitor: define new operations over an object structure without changing its classes.
// A visitor is any object with visitConcreteElementA/B; an element any object with accept().

export class ConcreteElementA {
  accept(visitor) {
    visitor.visitConcreteElementA(this);
  }

  operationA() {
    return "A";
  }
}

export class ConcreteElementB {
  accept(visitor) {
    visitor.visitConcreteElementB(this);
  }

  operationB() {
    return "B";
  }
}

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

/** Enumerates its elements and lets a visitor visit each. */
export class ObjectStructure {
  #elements = [];

  add(element) {
    this.#elements.push(element);
  }

  accept(visitor) {
    for (const element of this.#elements) {
      element.accept(visitor);
    }
  }
}
