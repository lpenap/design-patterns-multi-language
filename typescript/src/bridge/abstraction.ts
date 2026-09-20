import type { Implementor } from "./implementor.ts";

/** Holds the implementor and forwards the primitive operation to it. */
export class Abstraction {
  constructor(protected readonly implementor: Implementor) {}

  operation(): string {
    return `Abstraction(${this.implementor.operationImpl()})`;
  }
}
