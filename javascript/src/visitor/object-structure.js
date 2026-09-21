/** Enumerates its elements and lets a visitor visit each. */
export class ObjectStructure {
  #elements = [];

  add(element) {
    this.#elements.push(element);
  }

  accept(visitor) {
    for (const element of this.#elements) {
      element.accept(visitor);
    }
  }
}
