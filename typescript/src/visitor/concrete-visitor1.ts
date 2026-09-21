import type { Visitor } from "./visitor.ts";

/** Records which element classes it visited. */
export class ConcreteVisitor1 implements Visitor {
  private readonly visited: string[] = [];

  visitConcreteElementA(): void {
    this.visited.push("visited ConcreteElementA");
  }

  visitConcreteElementB(): void {
    this.visited.push("visited ConcreteElementB");
  }

  result(): string {
    return this.visited.join(", ");
  }
}
