import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { builderExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    builderExample.run(out);
    expect(builderExample.id).toBe("builder");
    expect(out.lines).toEqual([
      "Executing Builder Pattern Implementation",
      "  Director.construct(ConcreteBuilder): Product(PartA, PartB)",
      "  ConcreteBuilder alone, only part B: Product(PartB)",
    ]);
  });
});
