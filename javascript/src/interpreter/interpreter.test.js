import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { interpreterExample } from "./example.js";
import { AddExpression, Context, NumberExpression, SubtractExpression, VariableExpression } from "./interpreter.js";

describe("Interpreter", () => {
  it("terminals interpret themselves", () => {
    const context = new Context().assign("n", 7);
    assert.equal(new NumberExpression(4).interpret(context), 4);
    assert.equal(new NumberExpression(4).describe(), "4");
    assert.equal(new VariableExpression("n").interpret(context), 7);
    assert.equal(new VariableExpression("n").describe(), "n");
  });

  it("nonterminals combine their children", () => {
    const context = new Context();
    assert.equal(new AddExpression(new NumberExpression(2), new NumberExpression(3)).interpret(context), 5);
    assert.equal(new SubtractExpression(new NumberExpression(2), new NumberExpression(3)).interpret(context), -1);
  });

  it("trees nest to any depth", () => {
    const deep = new AddExpression(
      new SubtractExpression(new NumberExpression(10), new AddExpression(new NumberExpression(1), new NumberExpression(2))),
      new VariableExpression("z"),
    );
    assert.equal(deep.describe(), "((10 - (1 + 2)) + z)");
    assert.equal(deep.interpret(new Context().assign("z", 1)), 8);
    assert.equal(deep.interpret(new Context().assign("z", 100)), 107);
  });

  it("an undefined variable is an error", () => {
    assert.throws(() => new VariableExpression("q").interpret(new Context()), /undefined variable: q/);
  });

  it("example prints the expected lines", () => {
    const out = new BufferOutput();
    interpreterExample.run(out);
    assert.equal(interpreterExample.id, "interpreter");
    assert.deepEqual(out.lines, [
      "Executing Interpreter Pattern Implementation",
      "  Expression: ((x + 3) - y)",
      "  With x = 5, y = 2: 6",
      "  With x = 10, y = 0: 13",
    ]);
  });
});
