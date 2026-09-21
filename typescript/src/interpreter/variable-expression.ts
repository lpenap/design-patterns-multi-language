import type { AbstractExpression } from "./abstract-expression.ts";
import type { Context } from "./context.ts";

/** Terminal: a variable looked up in the context. */
export class VariableExpression implements AbstractExpression {
  constructor(private readonly name: string) {}

  interpret(context: Context): number {
    return context.lookup(this.name);
  }

  describe(): string {
    return this.name;
  }
}
