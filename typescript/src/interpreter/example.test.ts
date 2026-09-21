import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { interpreterExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    interpreterExample.run(out);
    expect(interpreterExample.id).toBe("interpreter");
    expect(out.lines).toEqual([
      "Executing Interpreter Pattern Implementation",
      "  Expression: ((x + 3) - y)",
      "  With x = 5, y = 2: 6",
      "  With x = 10, y = 0: 13",
    ]);
  });
});
