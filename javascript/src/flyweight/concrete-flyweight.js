// Flyweight: share fine-grained objects; keep the varying state outside them.
// A flyweight is any object with `operation(extrinsicState)`.

/** Stores intrinsic state; immutable, therefore sharable. */
export class ConcreteFlyweight {
  #intrinsicState;

  constructor(intrinsicState) {
    this.#intrinsicState = intrinsicState;
  }

  operation(extrinsicState) {
    return `ConcreteFlyweight(${this.#intrinsicState}) with extrinsic state ${extrinsicState}`;
  }
}
