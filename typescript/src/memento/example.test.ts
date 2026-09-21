import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { mementoExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    mementoExample.run(out);
    expect(mementoExample.id).toBe("memento");
    expect(out.lines).toEqual([
      "Executing Memento Pattern Implementation",
      "  Originator state: A (saved)",
      "  Originator state: B (saved)",
      "  Originator state: C",
      "  Restored: B",
      "  Restored: A",
    ]);
  });
});
