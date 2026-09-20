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
