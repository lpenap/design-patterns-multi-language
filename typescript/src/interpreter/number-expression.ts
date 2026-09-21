import type { AbstractExpression } from "./abstract-expression.ts";

/** Terminal: a literal number. */
export class NumberExpression implements AbstractExpression {
  constructor(private readonly value: number) {}

  interpret(): number {
    return this.value;
  }

  describe(): string {
    return String(this.value);
  }
}
