// Factory Method: let subclasses decide which class to instantiate.
//
// A product is any object with `name()`. There are no abstract methods in
// JavaScript, so the base `factoryMethod()` throws: forgetting the override
// fails at the first call instead of at definition time.

export class ConcreteProductA {
  name() {
    return "ConcreteProductA";
  }
}
