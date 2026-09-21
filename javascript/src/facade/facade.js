import { SubsystemA } from "./subsystem-a.js";
import { SubsystemB } from "./subsystem-b.js";
import { SubsystemC } from "./subsystem-c.js";

/** Knows which subsystem classes handle a request and drives them in order. */
export class Facade {
  #a = new SubsystemA();
  #b = new SubsystemB();
  #c = new SubsystemC();

  operation() {
    return `Facade.operation(): ${[this.#a.operationA(), this.#b.operationB(), this.#c.operationC()].join(", ")}`;
  }
}
