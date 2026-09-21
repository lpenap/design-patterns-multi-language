import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ConcreteStateA } from "./concrete-state-a.js";
import { Context } from "./context.js";

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
});
