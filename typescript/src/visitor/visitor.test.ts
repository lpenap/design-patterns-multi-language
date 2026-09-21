import { describe, expect, it } from "vitest";
import { ConcreteElementA } from "./concrete-element-a.ts";
import { ConcreteElementB } from "./concrete-element-b.ts";
import { ConcreteVisitor1 } from "./concrete-visitor1.ts";
import { ConcreteVisitor2 } from "./concrete-visitor2.ts";
import { ObjectStructure } from "./object-structure.ts";
import type { Visitor } from "./visitor.ts";

function structure(): ObjectStructure {
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
    expect(visitor.result()).toBe("visited ConcreteElementB");
    const other = new ConcreteVisitor2();
    new ConcreteElementA().accept(other);
    expect(other.result()).toBe("A");
  });

  it("visitors accumulate over the whole structure", () => {
    const visitor = new ConcreteVisitor2();
    structure().accept(visitor);
    expect(visitor.result()).toBe("A+B+A");
  });

  it("an empty structure yields an empty result", () => {
    const visitor = new ConcreteVisitor1();
    new ObjectStructure().accept(visitor);
    expect(visitor.result()).toBe("");
  });

  it("a new operation needs no change to the elements", () => {
    const counts: string[] = [];
    const counter: Visitor = {
      visitConcreteElementA: () => void counts.push("a"),
      visitConcreteElementB: () => void counts.push("b"),
    };
    structure().accept(counter);
    expect(counts).toEqual(["a", "b", "a"]);
  });
});
