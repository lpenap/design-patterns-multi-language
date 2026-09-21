import { SubsystemA } from "./subsystem-a.ts";
import { SubsystemB } from "./subsystem-b.ts";
import { SubsystemC } from "./subsystem-c.ts";

/** Knows which subsystem classes handle a request and drives them in order. */
export class Facade {
  private readonly a = new SubsystemA();
  private readonly b = new SubsystemB();
  private readonly c = new SubsystemC();

  operation(): string {
    return `Facade.operation(): ${[this.a.operationA(), this.b.operationB(), this.c.operationC()].join(", ")}`;
  }
}
