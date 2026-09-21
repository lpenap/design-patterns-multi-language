import { describe, expect, it } from "vitest";
import { ConcreteFlyweight } from "./concrete-flyweight.ts";
import { FlyweightFactory } from "./flyweight-factory.ts";

describe("Flyweight", () => {
  it("the same key yields the same object", () => {
    const factory = new FlyweightFactory();
    expect(factory.getFlyweight("a")).toBe(factory.getFlyweight("a"));
    expect(factory.getFlyweight("a")).not.toBe(factory.getFlyweight("b"));
  });

  it("the pool grows only with distinct keys", () => {
    const factory = new FlyweightFactory();
    for (const key of ["x", "y", "x", "x", "z"]) {
      factory.getFlyweight(key);
    }
    expect(factory.count()).toBe(3);
  });

  it("operation combines intrinsic and extrinsic state", () => {
    expect(new ConcreteFlyweight("q").operation(42)).toBe("ConcreteFlyweight(q) with extrinsic state 42");
  });
});
