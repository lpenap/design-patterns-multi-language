import { describe, expect, it } from "vitest";
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
});
