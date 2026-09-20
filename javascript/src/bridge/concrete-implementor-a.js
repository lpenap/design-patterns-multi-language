// Bridge: decouple an abstraction from its implementation so both can vary.
// An implementor is any object with `operationImpl()`.

export class ConcreteImplementorA {
  operationImpl() {
    return "ConcreteImplementorA";
  }
}
