import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { adapterExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    adapterExample.run(out);
    expect(adapterExample.id).toBe("adapter");
    expect(out.lines).toEqual(["Executing Adapter Pattern Implementation", "  Adapter(Adaptee)"]);
  });
});
