import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { Composite, Leaf } from "./composite.js";
import { compositeExample } from "./example.js";

describe("Composite", () => {
  it("a leaf renders its name", () => {
    assert.equal(new Leaf("X").operation(), "Leaf(X)");
  });

  it("an empty composite renders nothing inside", () => {
    assert.equal(new Composite().operation(), "Composite()");
  });

  it("composites nest to any depth", () => {
    const tree = new Composite().add(new Leaf("A")).add(new Composite().add(new Composite().add(new Leaf("B"))));
    assert.equal(tree.operation(), "Composite(Leaf(A)+Composite(Composite(Leaf(B))))");
  });

  it("client code is the same for leaf and composite", () => {
    const components = [new Leaf("A"), new Composite().add(new Leaf("A"))];
    assert.deepEqual(components.map((c) => c.operation()), ["Leaf(A)", "Composite(Leaf(A))"]);
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    compositeExample.run(out);
    assert.equal(compositeExample.id, "composite");
    assert.deepEqual(out.lines, ["Executing Composite Pattern Implementation", "  Leaf(A)", "  Composite(Leaf(A)+Leaf(B)+Composite(Leaf(C)))"]);
  });
});
