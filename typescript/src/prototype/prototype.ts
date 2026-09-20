/** Declares the interface for cloning itself. */
export interface Prototype {
  clone(): Prototype;
  describe(): string;
}

/** Copies its own state through the constructor. */
export class ConcretePrototype1 implements Prototype {
  constructor(private state: string) {}

  clone(): ConcretePrototype1 {
    return new ConcretePrototype1(this.state);
  }

  setState(state: string): void {
    this.state = state;
  }

  describe(): string {
    return `ConcretePrototype1(state=${this.state})`;
  }
}

export class ConcretePrototype2 implements Prototype {
  constructor(private state: string) {}

  clone(): ConcretePrototype2 {
    return new ConcretePrototype2(this.state);
  }

  setState(state: string): void {
    this.state = state;
  }

  describe(): string {
    return `ConcretePrototype2(state=${this.state})`;
  }
}
