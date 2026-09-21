/** Terminal: a variable looked up in the context. */
export class VariableExpression {
  #name;

  constructor(name) {
    this.#name = name;
  }

  interpret(context) {
    return context.lookup(this.#name);
  }

  describe() {
    return this.#name;
  }
}
