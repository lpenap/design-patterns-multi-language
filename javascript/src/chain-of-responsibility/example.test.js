import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { chainOfResponsibilityExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    chainOfResponsibilityExample.run(out);
    assert.equal(chainOfResponsibilityExample.id, "chain-of-responsibility");
    assert.deepEqual(out.lines, ["Executing Chain of Responsibility Pattern Implementation", "  -1 is negative", "  0 is zero", "  1 is positive"]);
  });
});
