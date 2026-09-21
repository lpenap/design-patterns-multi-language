export class ConcreteElementB {
  accept(visitor) {
    visitor.visitConcreteElementB(this);
  }

  operationB() {
    return "B";
  }
}
