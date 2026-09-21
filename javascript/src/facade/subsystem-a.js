// Facade: one simple entry point in front of a subsystem.

/** A subsystem class; knows nothing of the facade. */
export class SubsystemA {
  operationA() {
    return "SubsystemA.operationA";
  }
}
