import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { objectPoolExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    objectPoolExample.run(out);
    assert.equal(objectPoolExample.id, "object-pool");
    assert.deepEqual(out.lines, [
      "Executing Object Pool Pattern Implementation",
      "  Task A -> Reusable#1 (use 1)",
      "  Task B -> Reusable#2 (use 1)",
      "  Task C -> pool exhausted, 2 of 2 in use",
      "  Released Reusable#1",
      "  Task C -> Reusable#1 (use 2)",
      "  Created 2 objects for 4 requests",
    ]);
  });
});
