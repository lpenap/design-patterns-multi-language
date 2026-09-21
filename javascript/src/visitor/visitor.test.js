import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteElementA } from "./concrete-element-a.js";
import { ConcreteElementB } from "./concrete-element-b.js";
import { ConcreteVisitor1 } from "./concrete-visitor1.js";
import { ConcreteVisitor2 } from "./concrete-visitor2.js";
import { ObjectStructure } from "./object-structure.js";

function structure() {
  const s = new ObjectStructure();
  for (const element of [new ConcreteElementA(), new ConcreteElementB(), new ConcreteElementA()]) {
    s.add(element);
  }
  return s;
}

describe("Visitor", () => {
  it("each element dispatches to the visit method for its class", () => {
    const visitor = new ConcreteVisitor1();
    new ConcreteElementB().accept(visitor);
    assert.equal(visitor.result(), "visited ConcreteElementB");
    const other = new ConcreteVisitor2();
    new ConcreteElementA().accept(other);
    assert.equal(other.result(), "A");
  });

  it("visitors accumulate over the whole structure", () => {
    const visitor = new ConcreteVisitor2();
    structure().accept(visitor);
    assert.equal(visitor.result(), "A+B+A");
  });

  it("an empty structure yields an empty result", () => {
    const visitor = new ConcreteVisitor1();
    new ObjectStructure().accept(visitor);
    assert.equal(visitor.result(), "");
  });

  it("a new operation needs no change to the elements", () => {
    const counts = [];
    const counter = { visitConcreteElementA: () => counts.push("a"), visitConcreteElementB: () => counts.push("b") };
    structure().accept(counter);
    assert.deepEqual(counts, ["a", "b", "a"]);
  });
});
