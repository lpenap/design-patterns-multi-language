import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { chainOfResponsibilityExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    chainOfResponsibilityExample.run(out);
    expect(chainOfResponsibilityExample.id).toBe("chain-of-responsibility");
    expect(out.lines).toEqual(["Executing Chain of Responsibility Pattern Implementation", "  -1 is negative", "  0 is zero", "  1 is positive"]);
  });
});
