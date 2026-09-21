import { describe, expect, it } from "vitest";
import { ConcreteColleague1 } from "./concrete-colleague1.ts";
import { ConcreteColleague2 } from "./concrete-colleague2.ts";
import { ConcreteMediator } from "./concrete-mediator.ts";
import type { Mediator } from "./mediator.ts";

describe("Mediator", () => {
  it("routes messages to the other colleague in both directions", () => {
    const mediator = new ConcreteMediator();
    const one = new ConcreteColleague1(mediator);
    const two = new ConcreteColleague2(mediator);
    mediator.setColleague1(one);
    mediator.setColleague2(two);
    one.send("a");
    one.send("b");
    two.send("c");
    expect(two.received()).toEqual(["a", "b"]);
    expect(one.received()).toEqual(["c"]);
  });

  it("a message with no partner registered is dropped", () => {
    const mediator = new ConcreteMediator();
    const lonely = new ConcreteColleague1(mediator);
    mediator.setColleague1(lonely);
    lonely.send("anyone?");
    expect(lonely.received()).toEqual([]);
  });

  it("colleagues talk only to the mediator", () => {
    const seen: string[] = [];
    const recording: Mediator = { notify: (sender, message) => void seen.push(`${sender.name()}:${message}`) };
    const one = new ConcreteColleague1(recording);
    const two = new ConcreteColleague2(recording);
    one.send("x");
    two.send("y");
    expect(seen).toEqual(["ConcreteColleague1:x", "ConcreteColleague2:y"]);
    expect(one.received()).toEqual([]);
  });
});
