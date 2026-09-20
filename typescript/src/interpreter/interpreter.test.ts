import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { interpreterExample } from "./example.ts";
import { type AbstractExpression, AddExpression, Context, NumberExpression, SubtractExpression, VariableExpression } from "./interpreter.ts";

describe("Interpreter", () => {
  it("terminals interpret themselves", () => {
    const context = new Context().assign("n", 7);
    expect(new NumberExpression(4).interpret()).toBe(4);
    expect(new NumberExpression(4).describe()).toBe("4");
    expect(new VariableExpression("n").interpret(context)).toBe(7);
    expect(new VariableExpression("n").describe()).toBe("n");
  });

  it("nonterminals combine their children", () => {
    const context = new Context();
    expect(new AddExpression(new NumberExpression(2), new NumberExpression(3)).interpret(context)).toBe(5);
    expect(new SubtractExpression(new NumberExpression(2), new NumberExpression(3)).interpret(context)).toBe(-1);
  });

  it("trees nest to any depth", () => {
    const deep: AbstractExpression = new AddExpression(
      new SubtractExpression(new NumberExpression(10), new AddExpression(new NumberExpression(1), new NumberExpression(2))),
      new VariableExpression("z"),
    );
    expect(deep.describe()).toBe("((10 - (1 + 2)) + z)");
    expect(deep.interpret(new Context().assign("z", 1))).toBe(8);
    expect(deep.interpret(new Context().assign("z", 100))).toBe(107);
  });

  it("an undefined variable is an error", () => {
    expect(() => new VariableExpression("q").interpret(new Context())).toThrow("undefined variable: q");
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    interpreterExample.run(out);
    expect(interpreterExample.id).toBe("interpreter");
    expect(out.lines).toEqual([
      "Executing Interpreter Pattern Implementation",
      "  Expression: ((x + 3) - y)",
      "  With x = 5, y = 2: 6",
      "  With x = 10, y = 0: 13",
    ]);
  });
});
