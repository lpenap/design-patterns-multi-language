import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { monostateExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    monostateExample.run(out);
    assert.equal(monostateExample.id, "monostate");
    assert.deepEqual(out.lines, [
      "Executing Monostate Pattern Implementation",
      "  Two instances are distinct objects: true",
      "  a.setValue(42) then b.getValue(): 42",
      "  b.setValue(7) then a.getValue(): 7",
    ]);
  });
});
