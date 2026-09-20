/** Information global to the interpreter: the variable bindings. */
export class Context {
  private readonly variables = new Map<string, number>();

  assign(name: string, value: number): this {
    this.variables.set(name, value);
    return this;
  }

  lookup(name: string): number {
    const value = this.variables.get(name);
    if (value === undefined) {
      throw new Error(`undefined variable: ${name}`);
    }
    return value;
  }
}

/** A node of the abstract syntax tree. */
export interface AbstractExpression {
  interpret(context: Context): number;
  describe(): string;
}

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

/** Nonterminal: expression '-' expression. */
export class SubtractExpression implements AbstractExpression {
  constructor(
    private readonly left: AbstractExpression,
    private readonly right: AbstractExpression,
  ) {}

  interpret(context: Context): number {
    return this.left.interpret(context) - this.right.interpret(context);
  }

  describe(): string {
    return `(${this.left.describe()} - ${this.right.describe()})`;
  }
}
