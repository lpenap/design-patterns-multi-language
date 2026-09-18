// Simple Factory: one method decides which concrete product to instantiate.
// A product is any object with `name()`.

export class ConcreteProductA {
  name() {
    return "ConcreteProductA";
  }
}

export class ConcreteProductB {
  name() {
    return "ConcreteProductB";
  }
}

/** Maps a type code to a concrete product; the single place where products are created. */
export class SimpleFactory {
  createProduct(type) {
    switch (type) {
      case "A":
        return new ConcreteProductA();
      case "B":
        return new ConcreteProductB();
      default:
        throw new Error(`Unknown product type: ${type}`);
    }
  }
}
