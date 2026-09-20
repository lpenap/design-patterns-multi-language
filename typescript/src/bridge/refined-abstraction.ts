import { Abstraction } from "./abstraction.ts";

/** Extends the abstraction's behaviour without knowing the concrete implementor. */
export class RefinedAbstraction extends Abstraction {
  override operation(): string {
    return `RefinedAbstraction(${this.implementor.operationImpl()})`;
  }
}
