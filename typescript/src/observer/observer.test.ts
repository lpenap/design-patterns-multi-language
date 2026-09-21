import { describe, expect, it } from "vitest";
import { ConcreteObserver } from "./concrete-observer.ts";
import { ConcreteSubject } from "./concrete-subject.ts";

describe("Observer", () => {
  it("notifies every observer in attachment order", () => {
    const reports: string[] = [];
    const subject = new ConcreteSubject();
    subject.attach(new ConcreteObserver("a", (t) => reports.push(t)));
    subject.attach(new ConcreteObserver("b", (t) => reports.push(t)));
    subject.setState(1);
    expect(reports).toEqual(["a notified: state 0 -> 1", "b notified: state 0 -> 1"]);
    expect(subject.getState()).toBe(1);
  });

  it("a detached observer hears nothing further", () => {
    const reports: string[] = [];
    const subject = new ConcreteSubject();
    const a = new ConcreteObserver("a", (t) => reports.push(t));
    subject.attach(a);
    subject.setState(1);
    subject.detach(a);
    subject.detach(a); // detaching twice is harmless
    subject.setState(2);
    expect(reports).toEqual(["a notified: state 0 -> 1"]);
  });

  it("an unchanged state notifies nobody", () => {
    const reports: string[] = [];
    const subject = new ConcreteSubject();
    subject.attach(new ConcreteObserver("a", (t) => reports.push(t)));
    subject.setState(0);
    expect(reports).toEqual([]);
  });

  it("any object with update() can observe", () => {
    const seen: [number, number][] = [];
    const subject = new ConcreteSubject();
    subject.attach({ update: (o, n) => seen.push([o, n]) });
    subject.setState(3);
    expect(seen).toEqual([[0, 3]]);
  });
});
