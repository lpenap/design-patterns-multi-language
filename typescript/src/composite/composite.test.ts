import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { type Component, Composite, Leaf } from "./composite.ts";
import { compositeExample } from "./example.ts";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    compositeExample.run(out);
    expect(compositeExample.id).toBe("composite");
    expect(out.lines).toEqual(["Executing Composite Pattern Implementation", "  Leaf(A)", "  Composite(Leaf(A)+Leaf(B)+Composite(Leaf(C)))"]);
  });
});
