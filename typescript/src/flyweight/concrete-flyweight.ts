import type { Flyweight } from "./flyweight.ts";

/** Stores intrinsic state; immutable, therefore sharable. */
export class ConcreteFlyweight implements Flyweight {
  constructor(private readonly intrinsicState: string) {}

  operation(extrinsicState: number): string {
    return `ConcreteFlyweight(${this.intrinsicState}) with extrinsic state ${String(extrinsicState)}`;
  }
}
