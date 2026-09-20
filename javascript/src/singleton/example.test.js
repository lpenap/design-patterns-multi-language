import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { singletonExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    singletonExample.run(out);
    assert.equal(singletonExample.id, "singleton");
    assert.deepEqual(out.lines, ["Executing Singleton Pattern Implementation", "  Same instance returned twice: true", "  Singleton is doing something"]);
  });
});
