import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { visitorExample } from "./example.js";
import { ConcreteElementA, ConcreteElementB, ConcreteVisitor1, ConcreteVisitor2, ObjectStructure } from "./visitor.js";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    visitorExample.run(out);
    assert.equal(visitorExample.id, "visitor");
    assert.deepEqual(out.lines, [
      "Executing Visitor Pattern Implementation",
      "  ConcreteVisitor1: visited ConcreteElementA, visited ConcreteElementB",
      "  ConcreteVisitor2: A+B",
    ]);
  });
});
