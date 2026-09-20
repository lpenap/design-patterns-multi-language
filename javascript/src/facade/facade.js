// Facade: one simple entry point in front of a subsystem.

/** A subsystem class; knows nothing of the facade. */
export class SubsystemA {
  operationA() {
    return "SubsystemA.operationA";
  }
}

export class SubsystemB {
  operationB() {
    return "SubsystemB.operationB";
  }
}

export class SubsystemC {
  operationC() {
    return "SubsystemC.operationC";
  }
}

/** Knows which subsystem classes handle a request and drives them in order. */
export class Facade {
  #a = new SubsystemA();
  #b = new SubsystemB();
  #c = new SubsystemC();

  operation() {
    return `Facade.operation(): ${[this.#a.operationA(), this.#b.operationB(), this.#c.operationC()].join(", ")}`;
  }
}
