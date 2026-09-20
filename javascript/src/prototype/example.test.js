import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { prototypeExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    prototypeExample.run(out);
    assert.equal(prototypeExample.id, "prototype");
    assert.deepEqual(out.lines, [
      "Executing Prototype Pattern Implementation",
      "  Original: ConcretePrototype1(state=alpha)",
      "  Clone: ConcretePrototype1(state=alpha)",
      "  Clone is a distinct object: true",
      "  Clone after setState(beta): ConcretePrototype1(state=beta)",
      "  Original after the clone changed: ConcretePrototype1(state=alpha)",
      "  ConcretePrototype2 clone: ConcretePrototype2(state=gamma)",
    ]);
  });
});
