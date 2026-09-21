import { AddExpression } from "./add-expression.js";
import { Context } from "./context.js";
import { NumberExpression } from "./number-expression.js";
import { SubtractExpression } from "./subtract-expression.js";
import { VariableExpression } from "./variable-expression.js";

/** The client: builds the syntax tree by hand and interprets it under two contexts. */
export const interpreterExample = {
  id: "interpreter",
  run(out) {
    out.line("Executing Interpreter Pattern Implementation");
    const expression = new SubtractExpression(
      new AddExpression(new VariableExpression("x"), new NumberExpression(3)),
      new VariableExpression("y"),
    );
    out.line(`  Expression: ${expression.describe()}`);
    out.line(`  With x = 5, y = 2: ${expression.interpret(new Context().assign("x", 5).assign("y", 2))}`);
    out.line(`  With x = 10, y = 0: ${expression.interpret(new Context().assign("x", 10).assign("y", 0))}`);
  },
};
