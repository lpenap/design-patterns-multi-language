import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { facadeExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    facadeExample.run(out);
    expect(facadeExample.id).toBe("facade");
    expect(out.lines).toEqual([
      "Executing Facade Pattern Implementation",
      "  Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC",
    ]);
  });
});
