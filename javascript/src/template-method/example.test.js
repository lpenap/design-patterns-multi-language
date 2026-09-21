import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { templateMethodExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    templateMethodExample.run(out);
    assert.equal(templateMethodExample.id, "template-method");
    assert.deepEqual(out.lines, [
      "Executing Template Method Pattern Implementation",
      "  ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2",
      "  ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook",
    ]);
  });
});
