import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { commandExample } from "./example.js";

describe("example", () => {
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
