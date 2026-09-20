import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { mementoExample } from "./example.js";
import { Caretaker, Originator } from "./memento.js";

describe("Memento", () => {
  it("saved states are restored most recent first", () => {
    const originator = new Originator();
    const caretaker = new Caretaker();
    originator.setState("one");
    caretaker.save(originator);
    originator.setState("two");
    caretaker.save(originator);
    originator.setState("three");
    assert.equal(caretaker.undo(originator), true);
    assert.equal(originator.getState(), "two");
    assert.equal(caretaker.undo(originator), true);
    assert.equal(originator.getState(), "one");
  });

  it("undo with nothing saved leaves the originator alone", () => {
    const originator = new Originator();
    originator.setState("x");
    assert.equal(new Caretaker().undo(originator), false);
    assert.equal(originator.getState(), "x");
  });

  it("a memento captures the value at save time", () => {
    const originator = new Originator();
    originator.setState("before");
    const memento = originator.createMemento();
    originator.setState("after");
    originator.restore(memento);
    assert.equal(originator.getState(), "before");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    mementoExample.run(out);
    assert.equal(mementoExample.id, "memento");
    assert.deepEqual(out.lines, [
      "Executing Memento Pattern Implementation",
      "  Originator state: A (saved)",
      "  Originator state: B (saved)",
      "  Originator state: C",
      "  Restored: B",
      "  Restored: A",
    ]);
  });
});
