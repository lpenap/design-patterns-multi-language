import type { Prototype } from "./prototype.ts";

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
