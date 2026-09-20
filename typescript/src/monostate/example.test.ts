import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { monostateExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    monostateExample.run(out);
    expect(monostateExample.id).toBe("monostate");
    expect(out.lines).toEqual([
      "Executing Monostate Pattern Implementation",
      "  Two instances are distinct objects: true",
      "  a.setValue(42) then b.getValue(): 42",
      "  b.setValue(7) then a.getValue(): 7",
    ]);
  });
});
