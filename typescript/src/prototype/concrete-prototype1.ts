import type { Prototype } from "./prototype.ts";

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
