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
