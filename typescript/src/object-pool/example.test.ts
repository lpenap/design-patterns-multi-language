import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { objectPoolExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    objectPoolExample.run(out);
    expect(objectPoolExample.id).toBe("object-pool");
    expect(out.lines).toEqual([
      "Executing Object Pool Pattern Implementation",
      "  Task A -> Reusable#1 (use 1)",
      "  Task B -> Reusable#2 (use 1)",
      "  Task C -> pool exhausted, 2 of 2 in use",
      "  Released Reusable#1",
      "  Task C -> Reusable#1 (use 2)",
      "  Created 2 objects for 4 requests",
    ]);
  });
});
