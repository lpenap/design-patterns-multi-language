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
