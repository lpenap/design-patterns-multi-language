import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { visitorExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    visitorExample.run(out);
    assert.equal(visitorExample.id, "visitor");
    assert.deepEqual(out.lines, [
      "Executing Visitor Pattern Implementation",
      "  ConcreteVisitor1: visited ConcreteElementA, visited ConcreteElementB",
      "  ConcreteVisitor2: A+B",
    ]);
  });
});
