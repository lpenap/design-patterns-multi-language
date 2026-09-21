import { describe, expect, it } from "vitest";
import { ConcreteStateA } from "./concrete-state-a.ts";
import { Context } from "./context.ts";
import type { State } from "./state.ts";

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
});
