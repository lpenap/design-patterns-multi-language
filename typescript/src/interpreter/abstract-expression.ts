import type { Context } from "./context.ts";

/** A node of the abstract syntax tree. */
export interface AbstractExpression {
  interpret(context: Context): number;
  describe(): string;
}
