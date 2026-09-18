// Abstract Factory: create families of related objects without naming their classes.
//
// There are no abstract types here. A factory is any object with
// `createProductA()` and `createProductB()`; a product is any object with
// `name()`. Only the concrete classes exist.

export class ProductA1 {
  name() {
    return "ProductA1";
  }
}

export class ProductA2 {
  name() {
    return "ProductA2";
  }
}

export class ProductB1 {
  name() {
    return "ProductB1";
  }
}

export class ProductB2 {
  name() {
    return "ProductB2";
  }
}

/** Creates the products of family 1. */
export class ConcreteFactory1 {
  createProductA() {
    return new ProductA1();
  }

  createProductB() {
    return new ProductB1();
  }
}

/** Creates the products of family 2. */
export class ConcreteFactory2 {
  createProductA() {
    return new ProductA2();
  }

  createProductB() {
    return new ProductB2();
  }
}
