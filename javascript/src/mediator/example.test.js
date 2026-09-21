import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { mediatorExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    mediatorExample.run(out);
    assert.equal(mediatorExample.id, "mediator");
    assert.deepEqual(out.lines, [
      "Executing Mediator Pattern Implementation",
      "  ConcreteColleague1 sends: hello",
      "  ConcreteColleague2 receives: hello",
      "  ConcreteColleague2 sends: hi",
      "  ConcreteColleague1 receives: hi",
    ]);
  });
});
