import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { stateExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    stateExample.run(out);
    expect(stateExample.id).toBe("state");
    expect(out.lines).toEqual([
      "Executing State Pattern Implementation",
      "  Context in ConcreteStateA",
      "  request() handled by ConcreteStateA, now in ConcreteStateB",
      "  request() handled by ConcreteStateB, now in ConcreteStateA",
    ]);
  });
});
