import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { templateMethodExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    templateMethodExample.run(out);
    expect(templateMethodExample.id).toBe("template-method");
    expect(out.lines).toEqual([
      "Executing Template Method Pattern Implementation",
      "  ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2",
      "  ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook",
    ]);
  });
});
