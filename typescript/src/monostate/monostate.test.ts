import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { monostateExample } from "./example.ts";
import { Monostate } from "./monostate.ts";

describe("Monostate", () => {
  it("instances are distinct objects", () => {
    expect(new Monostate()).not.toBe(new Monostate());
  });

  it("a write through one instance is visible through all", () => {
    const a = new Monostate();
    const b = new Monostate();
    a.setValue(11);
    expect(b.getValue()).toBe(11);
    b.setValue(22);
    expect(a.getValue()).toBe(22);
  });

  it("an instance created later sees the shared state", () => {
    new Monostate().setValue(33);
    expect(new Monostate().getValue()).toBe(33);
  });

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
