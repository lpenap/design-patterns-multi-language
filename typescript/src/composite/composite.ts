/** The interface for objects in the composition. */
export interface Component {
  operation(): string;
}

/** A primitive with no children. */
export class Leaf implements Component {
  constructor(private readonly name: string) {}

  operation(): string {
    return `Leaf(${this.name})`;
  }
}

/** Stores children and delegates the operation to them; child management lives here (safe variant). */
export class Composite implements Component {
  private readonly children: Component[] = [];

  add(child: Component): this {
    this.children.push(child);
    return this;
  }

  operation(): string {
    return `Composite(${this.children.map((c) => c.operation()).join("+")})`;
  }
}
