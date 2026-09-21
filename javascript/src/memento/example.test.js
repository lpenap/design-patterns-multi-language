import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { mementoExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    mementoExample.run(out);
    assert.equal(mementoExample.id, "memento");
    assert.deepEqual(out.lines, [
      "Executing Memento Pattern Implementation",
      "  Originator state: A (saved)",
      "  Originator state: B (saved)",
      "  Originator state: C",
      "  Restored: B",
      "  Restored: A",
    ]);
  });
});
