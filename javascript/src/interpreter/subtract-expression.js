/** Nonterminal: expression '-' expression. */
export class SubtractExpression {
  #left;
  #right;

  constructor(left, right) {
    this.#left = left;
    this.#right = right;
  }

  interpret(context) {
    return this.#left.interpret(context) - this.#right.interpret(context);
  }

  describe() {
    return `(${this.#left.describe()} - ${this.#right.describe()})`;
  }
}
