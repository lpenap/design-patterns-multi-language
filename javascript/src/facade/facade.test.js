import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Facade } from "./facade.js";
import { SubsystemA } from "./subsystem-a.js";
import { SubsystemB } from "./subsystem-b.js";
import { SubsystemC } from "./subsystem-c.js";

describe("Facade", () => {
  it("drives the subsystem in order", () => {
    assert.equal(new Facade().operation(), "Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC");
  });

  it("subsystem classes remain usable directly", () => {
    assert.equal(new SubsystemA().operationA(), "SubsystemA.operationA");
    assert.equal(new SubsystemB().operationB(), "SubsystemB.operationB");
    assert.equal(new SubsystemC().operationC(), "SubsystemC.operationC");
  });
});
