import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { monostateExample } from "./example.js";
import { Monostate } from "./monostate.js";

describe("Monostate", () => {
  it("instances are distinct objects", () => {
    assert.notEqual(new Monostate(), new Monostate());
  });

  it("a write through one instance is visible through all", () => {
    const a = new Monostate();
    const b = new Monostate();
    a.setValue(11);
    assert.equal(b.getValue(), 11);
    b.setValue(22);
    assert.equal(a.getValue(), 22);
  });

  it("an instance created later sees the shared state", () => {
    new Monostate().setValue(33);
    assert.equal(new Monostate().getValue(), 33);
  });

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
