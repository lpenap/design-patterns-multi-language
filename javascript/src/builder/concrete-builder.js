import { Product } from "./product.js";

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
