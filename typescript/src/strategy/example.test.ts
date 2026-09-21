import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { strategyExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    strategyExample.run(out);
    expect(strategyExample.id).toBe("strategy");
    expect(out.lines).toEqual([
      "Executing Strategy Pattern Implementation",
      "  Operation with --> algorithm from ConcreteStrategyA",
      "  Operation with ==> algorithm from ConcreteStrategyB",
    ]);
  });
});
