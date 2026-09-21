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
