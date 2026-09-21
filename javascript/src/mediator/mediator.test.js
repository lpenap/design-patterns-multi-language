import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteColleague1 } from "./concrete-colleague1.js";
import { ConcreteColleague2 } from "./concrete-colleague2.js";
import { ConcreteMediator } from "./concrete-mediator.js";

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
    assert.deepEqual(two.received(), ["a", "b"]);
    assert.deepEqual(one.received(), ["c"]);
  });

  it("a message with no partner registered is dropped", () => {
    const mediator = new ConcreteMediator();
    const lonely = new ConcreteColleague1(mediator);
    mediator.setColleague1(lonely);
    lonely.send("anyone?");
    assert.deepEqual(lonely.received(), []);
  });

  it("colleagues talk only to the mediator", () => {
    const seen = [];
    const recording = { notify: (sender, message) => seen.push(`${sender.name()}:${message}`) };
    const one = new ConcreteColleague1(recording);
    const two = new ConcreteColleague2(recording);
    one.send("x");
    two.send("y");
    assert.deepEqual(seen, ["ConcreteColleague1:x", "ConcreteColleague2:y"]);
    assert.deepEqual(one.received(), []);
  });
});
