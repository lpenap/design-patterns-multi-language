import { describe, expect, it } from "vitest";
import { Caretaker } from "./caretaker.ts";
import { Originator } from "./originator.ts";

describe("Memento", () => {
  it("saved states are restored most recent first", () => {
    const originator = new Originator();
    const caretaker = new Caretaker();
    originator.setState("one");
    caretaker.save(originator);
    originator.setState("two");
    caretaker.save(originator);
    originator.setState("three");
    expect(caretaker.undo(originator)).toBe(true);
    expect(originator.getState()).toBe("two");
    expect(caretaker.undo(originator)).toBe(true);
    expect(originator.getState()).toBe("one");
  });

  it("undo with nothing saved leaves the originator alone", () => {
    const originator = new Originator();
    originator.setState("x");
    expect(new Caretaker().undo(originator)).toBe(false);
    expect(originator.getState()).toBe("x");
  });

  it("a memento captures the value at save time and foreign tokens are rejected", () => {
    const originator = new Originator();
    originator.setState("before");
    const memento = originator.createMemento();
    originator.setState("after");
    originator.restore(memento);
    expect(originator.getState()).toBe("before");
    expect(() => {
      originator.restore({});
    }).toThrow(TypeError);
  });
});
