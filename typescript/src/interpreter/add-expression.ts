import type { AbstractExpression } from "./abstract-expression.ts";
import type { Context } from "./context.ts";

/** Nonterminal: expression '+' expression. */
export class AddExpression implements AbstractExpression {
  constructor(
    private readonly left: AbstractExpression,
    private readonly right: AbstractExpression,
  ) {}

  interpret(context: Context): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }

  describe(): string {
    return `(${this.left.describe()} + ${this.right.describe()})`;
  }
}
