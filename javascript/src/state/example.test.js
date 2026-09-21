import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { stateExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    stateExample.run(out);
    assert.equal(stateExample.id, "state");
    assert.deepEqual(out.lines, [
      "Executing State Pattern Implementation",
      "  Context in ConcreteStateA",
      "  request() handled by ConcreteStateA, now in ConcreteStateB",
      "  request() handled by ConcreteStateB, now in ConcreteStateA",
    ]);
  });
});
