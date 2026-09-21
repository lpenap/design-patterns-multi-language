import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { commandExample } from "./example.ts";

describe("example", () => {
  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    commandExample.run(out);
    expect(commandExample.id).toBe("command");
    expect(out.lines).toEqual([
      "Executing Command Pattern Implementation",
      "  Executed ConcreteCommand(Hello): state = Hello",
      "  Executed ConcreteCommand(World): state = Hello World",
      "  Undone ConcreteCommand(World): state = Hello",
    ]);
  });
});
