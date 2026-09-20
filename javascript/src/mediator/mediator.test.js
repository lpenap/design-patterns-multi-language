import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { mediatorExample } from "./example.js";
import { ConcreteColleague1, ConcreteColleague2, ConcreteMediator } from "./mediator.js";

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

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    mediatorExample.run(out);
    assert.equal(mediatorExample.id, "mediator");
    assert.deepEqual(out.lines, [
      "Executing Mediator Pattern Implementation",
      "  ConcreteColleague1 sends: hello",
      "  ConcreteColleague2 receives: hello",
      "  ConcreteColleague2 sends: hi",
      "  ConcreteColleague1 receives: hi",
    ]);
  });
});
