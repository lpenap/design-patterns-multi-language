import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { stateExample } from "./example.js";
import { ConcreteStateA, Context } from "./state.js";

describe("State", () => {
  it("states alternate on each request", () => {
    const context = new Context(new ConcreteStateA());
    assert.equal(context.getStateName(), "ConcreteStateA");
    context.request();
    assert.equal(context.getStateName(), "ConcreteStateB");
    context.request();
    assert.equal(context.getStateName(), "ConcreteStateA");
  });

  it("the state decides the transition", () => {
    const stuck = { handle: () => {}, name: () => "Stuck" };
    assert.equal(new Context(stuck).request(), "request() handled by Stuck, now in Stuck");
  });

  it("a state instance can serve several contexts", () => {
    const shared = new ConcreteStateA();
    const one = new Context(shared);
    const two = new Context(shared);
    one.request();
    assert.equal(one.getStateName(), "ConcreteStateB");
    assert.equal(two.getStateName(), "ConcreteStateA");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    stateExample.run(out);
    assert.equal(stateExample.id, "state");
    assert.deepEqual(out.lines, [
      "Executing State Pattern Implementation",
      "  Context in ConcreteStateA",
      "  request() handled by ConcreteStateA, now in ConcreteStateB",
      "  request() handled by ConcreteStateB, now in ConcreteStateA",
    ]);
  });
});
