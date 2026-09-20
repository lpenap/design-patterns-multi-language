import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { builderExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    builderExample.run(out);
    assert.equal(builderExample.id, "builder");
    assert.deepEqual(out.lines, [
      "Executing Builder Pattern Implementation",
      "  Director.construct(ConcreteBuilder): Product(PartA, PartB)",
      "  ConcreteBuilder alone, only part B: Product(PartB)",
    ]);
  });
});
