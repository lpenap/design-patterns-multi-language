import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { iteratorExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    iteratorExample.run(out);
    assert.equal(iteratorExample.id, "iterator");
    assert.deepEqual(out.lines, [
      "Executing Iterator Pattern Implementation",
      "  ConcreteIterator traversal: a b c",
      "  Two iterators are independent: first.next()=a, second.next()=a",
    ]);
  });
});
