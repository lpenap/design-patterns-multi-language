/** Terminal: a literal number. */
export class NumberExpression {
  #value;

  constructor(value) {
    this.#value = value;
  }

  interpret() {
    return this.#value;
  }

  describe() {
    return String(this.#value);
  }
}
