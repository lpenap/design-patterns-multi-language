/** One visit operation per concrete element class. */
export interface Visitor {
  visitConcreteElementA(element: ConcreteElementA): void;
  visitConcreteElementB(element: ConcreteElementB): void;
}

/** Accepts a visitor and dispatches to the visit method for its own class. */
export interface Element {
  accept(visitor: Visitor): void;
}

export class ConcreteElementA implements Element {
  accept(visitor: Visitor): void {
    visitor.visitConcreteElementA(this);
  }

  operationA(): string {
    return "A";
  }
}

export class ConcreteElementB implements Element {
  accept(visitor: Visitor): void {
    visitor.visitConcreteElementB(this);
  }

  operationB(): string {
    return "B";
  }
}

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

/** Concatenates what each element computes. */
export class ConcreteVisitor2 implements Visitor {
  private readonly parts: string[] = [];

  visitConcreteElementA(element: ConcreteElementA): void {
    this.parts.push(element.operationA());
  }

  visitConcreteElementB(element: ConcreteElementB): void {
    this.parts.push(element.operationB());
  }

  result(): string {
    return this.parts.join("+");
  }
}

/** Enumerates its elements and lets a visitor visit each. */
export class ObjectStructure {
  private readonly elements: Element[] = [];

  add(element: Element): void {
    this.elements.push(element);
  }

  accept(visitor: Visitor): void {
    for (const element of this.elements) {
      element.accept(visitor);
    }
  }
}
