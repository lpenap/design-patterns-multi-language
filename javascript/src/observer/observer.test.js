import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { observerExample } from "./example.js";
import { ConcreteObserver, ConcreteSubject } from "./observer.js";

describe("Observer", () => {
  it("notifies every observer in attachment order", () => {
    const reports = [];
    const subject = new ConcreteSubject();
    subject.attach(new ConcreteObserver("a", (t) => reports.push(t)));
    subject.attach(new ConcreteObserver("b", (t) => reports.push(t)));
    subject.setState(1);
    assert.deepEqual(reports, ["a notified: state 0 -> 1", "b notified: state 0 -> 1"]);
    assert.equal(subject.getState(), 1);
  });

  it("a detached observer hears nothing further", () => {
    const reports = [];
    const subject = new ConcreteSubject();
    const a = new ConcreteObserver("a", (t) => reports.push(t));
    subject.attach(a);
    subject.setState(1);
    subject.detach(a);
    subject.detach(a); // detaching twice is harmless
    subject.setState(2);
    assert.deepEqual(reports, ["a notified: state 0 -> 1"]);
  });

  it("an unchanged state notifies nobody", () => {
    const reports = [];
    const subject = new ConcreteSubject();
    subject.attach(new ConcreteObserver("a", (t) => reports.push(t)));
    subject.setState(0);
    assert.deepEqual(reports, []);
  });

  it("any object with update() can observe", () => {
    const seen = [];
    const subject = new ConcreteSubject();
    subject.attach({ update: (o, n) => seen.push([o, n]) });
    subject.setState(3);
    assert.deepEqual(seen, [[0, 3]]);
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    observerExample.run(out);
    assert.equal(observerExample.id, "observer");
    assert.deepEqual(out.lines, [
      "Executing Observer Pattern Implementation",
      "  observer1 notified: state 0 -> 5",
      "  observer2 notified: state 0 -> 5",
      "  observer1 notified: state 5 -> 10",
    ]);
  });
});
