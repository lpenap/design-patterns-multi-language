import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { factoryMethodExample } from "./example.js";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    factoryMethodExample.run(out);
    assert.equal(factoryMethodExample.id, "factory-method");
    assert.deepEqual(out.lines, ["Executing Factory Method Pattern Implementation", "  Built ConcreteProductA", "  Built ConcreteProductB"]);
  });
});
