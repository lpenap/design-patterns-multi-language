import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { facadeExample } from "./example.ts";
import { Facade, SubsystemA, SubsystemB, SubsystemC } from "./facade.ts";

describe("Facade", () => {
  it("drives the subsystem in order", () => {
    expect(new Facade().operation()).toBe("Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC");
  });

  it("subsystem classes remain usable directly", () => {
    expect(new SubsystemA().operationA()).toBe("SubsystemA.operationA");
    expect(new SubsystemB().operationB()).toBe("SubsystemB.operationB");
    expect(new SubsystemC().operationC()).toBe("SubsystemC.operationC");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    facadeExample.run(out);
    expect(facadeExample.id).toBe("facade");
    expect(out.lines).toEqual([
      "Executing Facade Pattern Implementation",
      "  Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC",
    ]);
  });
});
