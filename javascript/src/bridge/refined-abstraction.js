import { Abstraction } from "./abstraction.js";

/** Extends the abstraction's behaviour without knowing the concrete implementor. */
export class RefinedAbstraction extends Abstraction {
  operation() {
    return `RefinedAbstraction(${this.implementor.operationImpl()})`;
  }
}
