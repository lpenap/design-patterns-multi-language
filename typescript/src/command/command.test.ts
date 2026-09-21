import { describe, expect, it } from "vitest";
import type { Command } from "./command.ts";
import { ConcreteCommand } from "./concrete-command.ts";
import { Invoker } from "./invoker.ts";
import { Receiver } from "./receiver.ts";

describe("Command", () => {
  it("execute and undo act on the receiver", () => {
    const receiver = new Receiver();
    const command = new ConcreteCommand(receiver, "x");
    command.execute();
    expect(receiver.getState()).toBe("x");
    command.undo();
    expect(receiver.getState()).toBe("");
    command.undo(); // nothing left to reverse; harmless
    expect(receiver.getState()).toBe("");
    expect(command.describe()).toBe("ConcreteCommand(x)");
  });

  it("the invoker undoes most recent first", () => {
    const receiver = new Receiver();
    const invoker = new Invoker();
    invoker.execute(new ConcreteCommand(receiver, "a"));
    invoker.execute(new ConcreteCommand(receiver, "b"));
    expect(invoker.undo()?.describe()).toBe("ConcreteCommand(b)");
    expect(receiver.getState()).toBe("a");
    expect(invoker.undo()?.describe()).toBe("ConcreteCommand(a)");
    expect(receiver.getState()).toBe("");
  });

  it("undo with an empty history does nothing", () => {
    expect(new Invoker().undo()).toBeUndefined();
  });

  it("any command works with the invoker", () => {
    const log: string[] = [];
    const custom: Command = {
      execute: () => {
        log.push("do");
      },
      undo: () => {
        log.push("undo");
      },
      describe: () => "custom",
    };
    const invoker = new Invoker();
    invoker.execute(custom);
    invoker.undo();
    expect(log).toEqual(["do", "undo"]);
  });
});
