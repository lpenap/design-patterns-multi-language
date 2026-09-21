import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteAggregate } from "./concrete-aggregate.js";

function abc() {
  const aggregate = new ConcreteAggregate();
  for (const item of ["a", "b", "c"]) {
    aggregate.add(item);
  }
  return aggregate;
}

describe("Iterator", () => {
  it("traverses in order and stops at the end", () => {
    const iter = abc().createIterator();
    assert.equal(iter.hasNext(), true);
    assert.deepEqual([iter.next(), iter.next(), iter.next()], ["a", "b", "c"]);
    assert.equal(iter.hasNext(), false);
    assert.throws(() => iter.next(), /no more elements/);
  });

  it("iterators over one aggregate are independent", () => {
    const aggregate = abc();
    const first = aggregate.createIterator();
    const second = aggregate.createIterator();
    first.next();
    first.next();
    assert.equal(first.next(), "c");
    assert.equal(second.next(), "a");
  });

  it("an empty aggregate has nothing to visit", () => {
    const empty = new ConcreteAggregate();
    assert.equal(empty.count(), 0);
    assert.equal(empty.createIterator().hasNext(), false);
  });
});
