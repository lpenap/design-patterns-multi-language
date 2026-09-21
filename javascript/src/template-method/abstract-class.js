// Template Method: fix an algorithm's skeleton, defer some steps to subclasses.
// There are no abstract methods in JavaScript: the base primitive operations
// throw, so a subclass that forgets one fails at the first call.

/** Fixes the algorithm's skeleton; subclasses supply the steps. */
export class AbstractClass {
  /** The skeleton; the order is protected by convention. */
  templateMethod() {
    return `${this.primitiveOperation1()} then ${this.primitiveOperation2()}${this.hook()}`;
  }

  primitiveOperation1() {
    throw new Error("ConcreteClass must implement primitiveOperation1()");
  }

  primitiveOperation2() {
    throw new Error("ConcreteClass must implement primitiveOperation2()");
  }

  /** A hook: default behaviour that subclasses may extend. */
  hook() {
    return "";
  }
}
