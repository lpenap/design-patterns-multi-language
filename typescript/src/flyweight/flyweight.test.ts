import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { flyweightExample } from "./example.ts";
import { ConcreteFlyweight, FlyweightFactory } from "./flyweight.ts";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    flyweightExample.run(out);
    expect(flyweightExample.id).toBe("flyweight");
    expect(out.lines).toEqual([
      "Executing Flyweight Pattern Implementation",
      "  ConcreteFlyweight(a) with extrinsic state 1",
      "  ConcreteFlyweight(b) with extrinsic state 2",
      "  ConcreteFlyweight(a) with extrinsic state 3",
      "  Flyweights created: 2 for 3 requests",
    ]);
  });
});
