// Interpreter: a class per grammar rule; a sentence is a tree that interprets itself.
// An expression is any object with interpret(context) and describe().

/** Information global to the interpreter: the variable bindings. */
export class Context {
  #variables = new Map();

  assign(name, value) {
    this.#variables.set(name, value);
    return this;
  }

  lookup(name) {
    if (!this.#variables.has(name)) {
      throw new Error(`undefined variable: ${name}`);
    }
    return this.#variables.get(name);
  }
}

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

/** Nonterminal: expression '+' expression. */
export class AddExpression {
  #left;
  #right;

  constructor(left, right) {
    this.#left = left;
    this.#right = right;
  }

  interpret(context) {
    return this.#left.interpret(context) + this.#right.interpret(context);
  }

  describe() {
    return `(${this.#left.describe()} + ${this.#right.describe()})`;
  }
}

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
