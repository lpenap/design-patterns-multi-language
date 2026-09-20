import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { stateExample } from "./example.ts";
import { ConcreteStateA, Context, type State } from "./state.ts";

describe("State", () => {
  it("states alternate on each request", () => {
    const context = new Context(new ConcreteStateA());
    expect(context.getStateName()).toBe("ConcreteStateA");
    context.request();
    expect(context.getStateName()).toBe("ConcreteStateB");
    context.request();
    expect(context.getStateName()).toBe("ConcreteStateA");
  });

  it("the state decides the transition", () => {
    const stuck: State = {
      handle: () => {
        /* stays where it is */
      },
      name: () => "Stuck",
    };
    expect(new Context(stuck).request()).toBe("request() handled by Stuck, now in Stuck");
  });

  it("a state instance can serve several contexts", () => {
    const shared = new ConcreteStateA();
    const one = new Context(shared);
    const two = new Context(shared);
    one.request();
    expect(one.getStateName()).toBe("ConcreteStateB");
    expect(two.getStateName()).toBe("ConcreteStateA");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    stateExample.run(out);
    expect(stateExample.id).toBe("state");
    expect(out.lines).toEqual([
      "Executing State Pattern Implementation",
      "  Context in ConcreteStateA",
      "  request() handled by ConcreteStateA, now in ConcreteStateB",
      "  request() handled by ConcreteStateB, now in ConcreteStateA",
    ]);
  });
});
