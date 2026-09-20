import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { facadeExample } from "./example.js";
import { Facade, SubsystemA, SubsystemB, SubsystemC } from "./facade.js";

describe("Facade", () => {
  it("drives the subsystem in order", () => {
    assert.equal(new Facade().operation(), "Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC");
  });

  it("subsystem classes remain usable directly", () => {
    assert.equal(new SubsystemA().operationA(), "SubsystemA.operationA");
    assert.equal(new SubsystemB().operationB(), "SubsystemB.operationB");
    assert.equal(new SubsystemC().operationC(), "SubsystemC.operationC");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    facadeExample.run(out);
    assert.equal(facadeExample.id, "facade");
    assert.deepEqual(out.lines, [
      "Executing Facade Pattern Implementation",
      "  Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC",
    ]);
  });
});
