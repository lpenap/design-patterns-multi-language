import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { abstractFactoryExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    abstractFactoryExample.run(out);
    assert.equal(abstractFactoryExample.id, "abstract-factory");
    assert.deepEqual(out.lines, ["Executing Abstract Factory Pattern Implementation", "  ProductA1", "  ProductB1", "  ProductA2", "  ProductB2"]);
  });
});
