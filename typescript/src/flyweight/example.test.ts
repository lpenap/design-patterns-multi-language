import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { flyweightExample } from "./example.ts";

describe("example", () => {
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
