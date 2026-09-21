import { describe, expect, it } from "vitest";
import { Facade } from "./facade.ts";
import { SubsystemA } from "./subsystem-a.ts";
import { SubsystemB } from "./subsystem-b.ts";
import { SubsystemC } from "./subsystem-c.ts";

describe("Facade", () => {
  it("drives the subsystem in order", () => {
    expect(new Facade().operation()).toBe("Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC");
  });

  it("subsystem classes remain usable directly", () => {
    expect(new SubsystemA().operationA()).toBe("SubsystemA.operationA");
    expect(new SubsystemB().operationB()).toBe("SubsystemB.operationB");
    expect(new SubsystemC().operationC()).toBe("SubsystemC.operationC");
  });
});
