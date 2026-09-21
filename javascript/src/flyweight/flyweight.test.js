import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteFlyweight } from "./concrete-flyweight.js";
import { FlyweightFactory } from "./flyweight-factory.js";

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
});
