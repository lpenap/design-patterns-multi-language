/** A subsystem class; knows nothing of the facade. */
export class SubsystemA {
  operationA(): string {
    return "SubsystemA.operationA";
  }
}

export class SubsystemB {
  operationB(): string {
    return "SubsystemB.operationB";
  }
}

export class SubsystemC {
  operationC(): string {
    return "SubsystemC.operationC";
  }
}

/** Knows which subsystem classes handle a request and drives them in order. */
export class Facade {
  private readonly a = new SubsystemA();
  private readonly b = new SubsystemB();
  private readonly c = new SubsystemC();

  operation(): string {
    return `Facade.operation(): ${[this.a.operationA(), this.b.operationB(), this.c.operationC()].join(", ")}`;
  }
}
