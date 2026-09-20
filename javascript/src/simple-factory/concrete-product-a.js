// Simple Factory: one method decides which concrete product to instantiate.
// A product is any object with `name()`.

export class ConcreteProductA {
  name() {
    return "ConcreteProductA";
  }
}
