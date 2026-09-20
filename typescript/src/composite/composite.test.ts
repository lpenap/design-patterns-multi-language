import { describe, expect, it } from "vitest";
import type { Component } from "./component.ts";
import { Composite } from "./composite.ts";
import { Leaf } from "./leaf.ts";

describe("Composite", () => {
  it("a leaf renders its name", () => {
    expect(new Leaf("X").operation()).toBe("Leaf(X)");
  });

  it("an empty composite renders nothing inside", () => {
    expect(new Composite().operation()).toBe("Composite()");
  });

  it("composites nest to any depth", () => {
    const tree: Component = new Composite().add(new Leaf("A")).add(new Composite().add(new Composite().add(new Leaf("B"))));
    expect(tree.operation()).toBe("Composite(Leaf(A)+Composite(Composite(Leaf(B))))");
  });

  it("client code is the same for leaf and composite", () => {
    const components: Component[] = [new Leaf("A"), new Composite().add(new Leaf("A"))];
    expect(components.map((c) => c.operation())).toEqual(["Leaf(A)", "Composite(Leaf(A))"]);
  });
});
