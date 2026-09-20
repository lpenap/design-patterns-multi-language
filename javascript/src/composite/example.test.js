import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { compositeExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    compositeExample.run(out);
    assert.equal(compositeExample.id, "composite");
    assert.deepEqual(out.lines, ["Executing Composite Pattern Implementation", "  Leaf(A)", "  Composite(Leaf(A)+Leaf(B)+Composite(Leaf(C)))"]);
  });
});
