import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { observerExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    observerExample.run(out);
    assert.equal(observerExample.id, "observer");
    assert.deepEqual(out.lines, [
      "Executing Observer Pattern Implementation",
      "  observer1 notified: state 0 -> 5",
      "  observer2 notified: state 0 -> 5",
      "  observer1 notified: state 5 -> 10",
    ]);
  });
});
