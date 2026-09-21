import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { flyweightExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    flyweightExample.run(out);
    assert.equal(flyweightExample.id, "flyweight");
    assert.deepEqual(out.lines, [
      "Executing Flyweight Pattern Implementation",
      "  ConcreteFlyweight(a) with extrinsic state 1",
      "  ConcreteFlyweight(b) with extrinsic state 2",
      "  ConcreteFlyweight(a) with extrinsic state 3",
      "  Flyweights created: 2 for 3 requests",
    ]);
  });
});
