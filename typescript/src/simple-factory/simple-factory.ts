/** The interface every product implements. */
export interface Product {
  name(): string;
}

export class ConcreteProductA implements Product {
  name(): string {
    return "ConcreteProductA";
  }
}

export class ConcreteProductB implements Product {
  name(): string {
    return "ConcreteProductB";
  }
}

/** Maps a type code to a concrete product; the single place where products are created. */
export class SimpleFactory {
  // `string`, not `"A" | "B"`: the decision is made on run-time data.
  createProduct(type: string): Product {
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
