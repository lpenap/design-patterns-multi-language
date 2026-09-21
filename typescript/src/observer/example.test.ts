import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { observerExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    observerExample.run(out);
    expect(observerExample.id).toBe("observer");
    expect(out.lines).toEqual([
      "Executing Observer Pattern Implementation",
      "  observer1 notified: state 0 -> 5",
      "  observer2 notified: state 0 -> 5",
      "  observer1 notified: state 5 -> 10",
    ]);
  });
});
