import { ConcreteMemento } from "./concrete-memento.ts";
import type { Memento } from "./memento.ts";

/** Creates mementos of its state and restores itself from them. */
export class Originator {
  private state = "";

  setState(state: string): void {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }

  createMemento(): Memento {
    return new ConcreteMemento(this.state);
  }

  restore(memento: Memento): void {
    if (!(memento instanceof ConcreteMemento)) {
      throw new TypeError("memento was not created by this originator");
    }
    this.state = memento.state;
  }
}
