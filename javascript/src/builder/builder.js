// Builder: separate the construction of a complex object from its representation.
// A builder is any object with buildPartA(), buildPartB() and getResult().

/** The complex object under construction. */
export class Product {
  #parts = [];

  add(part) {
    this.#parts.push(part);
  }

  describe() {
    return `Product(${this.#parts.join(", ")})`;
  }
}

/** Assembles the parts into one representation and hands it out. */
export class ConcreteBuilder {
  #product = new Product();

  buildPartA() {
    this.#product.add("PartA");
  }

  buildPartB() {
    this.#product.add("PartB");
  }

  getResult() {
    return this.#product;
  }
}

/** Owns the sequence of construction steps; knows nothing of the representation. */
export class Director {
  construct(builder) {
    builder.buildPartA();
    builder.buildPartB();
    return builder.getResult();
  }
}
