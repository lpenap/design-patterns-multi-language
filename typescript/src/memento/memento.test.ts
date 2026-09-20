import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { mementoExample } from "./example.ts";
import { Caretaker, Originator } from "./memento.ts";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    mementoExample.run(out);
    expect(mementoExample.id).toBe("memento");
    expect(out.lines).toEqual([
      "Executing Memento Pattern Implementation",
      "  Originator state: A (saved)",
      "  Originator state: B (saved)",
      "  Originator state: C",
      "  Restored: B",
      "  Restored: A",
    ]);
  });
});
