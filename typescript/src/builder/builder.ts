/** The complex object under construction. */
export class Product {
  private readonly parts: string[] = [];

  add(part: string): void {
    this.parts.push(part);
  }

  describe(): string {
    return `Product(${this.parts.join(", ")})`;
  }
}

/** The abstract interface for creating parts of a product. */
export interface Builder {
  buildPartA(): void;
  buildPartB(): void;
  getResult(): Product;
}

/** Assembles the parts into one representation and hands it out. */
export class ConcreteBuilder implements Builder {
  private readonly product = new Product();

  buildPartA(): void {
    this.product.add("PartA");
  }

  buildPartB(): void {
    this.product.add("PartB");
  }

  getResult(): Product {
    return this.product;
  }
}

/** Owns the sequence of construction steps; knows nothing of the representation. */
export class Director {
  construct(builder: Builder): Product {
    builder.buildPartA();
    builder.buildPartB();
    return builder.getResult();
  }
}
