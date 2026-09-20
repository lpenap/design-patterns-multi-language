import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { iteratorExample } from "./example.ts";
import { ConcreteAggregate } from "./iterator.ts";

function abc(): ConcreteAggregate {
  const aggregate = new ConcreteAggregate();
  for (const item of ["a", "b", "c"]) {
    aggregate.add(item);
  }
  return aggregate;
}

describe("Iterator", () => {
  it("traverses in order and stops at the end", () => {
    const iter = abc().createIterator();
    expect(iter.hasNext()).toBe(true);
    expect([iter.next(), iter.next(), iter.next()]).toEqual(["a", "b", "c"]);
    expect(iter.hasNext()).toBe(false);
    expect(() => iter.next()).toThrow("no more elements");
  });

  it("iterators over one aggregate are independent", () => {
    const aggregate = abc();
    const first = aggregate.createIterator();
    const second = aggregate.createIterator();
    first.next();
    first.next();
    expect(first.next()).toBe("c");
    expect(second.next()).toBe("a");
  });

  it("an empty aggregate has nothing to visit and rejects out-of-range access", () => {
    const empty = new ConcreteAggregate();
    expect(empty.count()).toBe(0);
    expect(empty.createIterator().hasNext()).toBe(false);
    expect(() => empty.get(0)).toThrow(RangeError);
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    iteratorExample.run(out);
    expect(iteratorExample.id).toBe("iterator");
    expect(out.lines).toEqual([
      "Executing Iterator Pattern Implementation",
      "  ConcreteIterator traversal: a b c",
      "  Two iterators are independent: first.next()=a, second.next()=a",
    ]);
  });
});
