import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { facadeExample } from "./example.js";

describe("example", () => {
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
