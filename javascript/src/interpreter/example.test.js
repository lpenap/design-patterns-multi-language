import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { interpreterExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    interpreterExample.run(out);
    assert.equal(interpreterExample.id, "interpreter");
    assert.deepEqual(out.lines, [
      "Executing Interpreter Pattern Implementation",
      "  Expression: ((x + 3) - y)",
      "  With x = 5, y = 2: 6",
      "  With x = 10, y = 0: 13",
    ]);
  });
});
