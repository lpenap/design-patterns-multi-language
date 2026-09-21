import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { visitorExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    visitorExample.run(out);
    expect(visitorExample.id).toBe("visitor");
    expect(out.lines).toEqual([
      "Executing Visitor Pattern Implementation",
      "  ConcreteVisitor1: visited ConcreteElementA, visited ConcreteElementB",
      "  ConcreteVisitor2: A+B",
    ]);
  });
});
