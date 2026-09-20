import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { simpleFactoryExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    simpleFactoryExample.run(out);
    assert.equal(simpleFactoryExample.id, "simple-factory");
    assert.deepEqual(out.lines, ["Executing Simple Factory Pattern Implementation", "  ConcreteProductA", "  ConcreteProductB"]);
  });
});
