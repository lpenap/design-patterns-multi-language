import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { compositeExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    compositeExample.run(out);
    expect(compositeExample.id).toBe("composite");
    expect(out.lines).toEqual(["Executing Composite Pattern Implementation", "  Leaf(A)", "  Composite(Leaf(A)+Leaf(B)+Composite(Leaf(C)))"]);
  });
});
