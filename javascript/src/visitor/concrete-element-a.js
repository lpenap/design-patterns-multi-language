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
