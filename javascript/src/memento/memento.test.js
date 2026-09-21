import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Caretaker } from "./caretaker.js";
import { Originator } from "./originator.js";

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
});
