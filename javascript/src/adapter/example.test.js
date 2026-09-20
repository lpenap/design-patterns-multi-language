import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { adapterExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    adapterExample.run(out);
    assert.equal(adapterExample.id, "adapter");
    assert.deepEqual(out.lines, ["Executing Adapter Pattern Implementation", "  Adapter(Adaptee)"]);
  });
});
