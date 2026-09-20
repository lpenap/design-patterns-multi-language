import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { flyweightExample } from "./example.js";
import { ConcreteFlyweight, FlyweightFactory } from "./flyweight.js";

describe("Flyweight", () => {
  it("the same key yields the same object", () => {
    const factory = new FlyweightFactory();
    assert.equal(factory.getFlyweight("a"), factory.getFlyweight("a"));
    assert.notEqual(factory.getFlyweight("a"), factory.getFlyweight("b"));
  });

  it("the pool grows only with distinct keys", () => {
    const factory = new FlyweightFactory();
    for (const key of ["x", "y", "x", "x", "z"]) {
      factory.getFlyweight(key);
    }
    assert.equal(factory.count(), 3);
  });

  it("operation combines intrinsic and extrinsic state", () => {
    assert.equal(new ConcreteFlyweight("q").operation(42), "ConcreteFlyweight(q) with extrinsic state 42");
  });

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
