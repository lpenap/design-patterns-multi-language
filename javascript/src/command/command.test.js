import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { ConcreteCommand, Invoker, Receiver } from "./command.js";
import { commandExample } from "./example.js";

describe("Command", () => {
  it("execute and undo act on the receiver", () => {
    const receiver = new Receiver();
    const command = new ConcreteCommand(receiver, "x");
    command.execute();
    assert.equal(receiver.getState(), "x");
    command.undo();
    assert.equal(receiver.getState(), "");
    command.undo(); // nothing left to reverse; harmless
    assert.equal(receiver.getState(), "");
    assert.equal(command.describe(), "ConcreteCommand(x)");
  });

  it("the invoker undoes most recent first", () => {
    const receiver = new Receiver();
    const invoker = new Invoker();
    invoker.execute(new ConcreteCommand(receiver, "a"));
    invoker.execute(new ConcreteCommand(receiver, "b"));
    assert.equal(invoker.undo().describe(), "ConcreteCommand(b)");
    assert.equal(receiver.getState(), "a");
    assert.equal(invoker.undo().describe(), "ConcreteCommand(a)");
    assert.equal(receiver.getState(), "");
  });

  it("undo with an empty history does nothing", () => {
    assert.equal(new Invoker().undo(), undefined);
  });

  it("any command works with the invoker", () => {
    const log = [];
    const custom = { execute: () => log.push("do"), undo: () => log.push("undo"), describe: () => "custom" };
    const invoker = new Invoker();
    invoker.execute(custom);
    invoker.undo();
    assert.deepEqual(log, ["do", "undo"]);
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    commandExample.run(out);
    assert.equal(commandExample.id, "command");
    assert.deepEqual(out.lines, [
      "Executing Command Pattern Implementation",
      "  Executed ConcreteCommand(Hello): state = Hello",
      "  Executed ConcreteCommand(World): state = Hello World",
      "  Undone ConcreteCommand(World): state = Hello",
    ]);
  });
});
