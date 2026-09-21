import type { Memento } from "./memento.ts";
import type { Originator } from "./originator.ts";

/** Keeps mementos safe; never examines their contents. */
export class Caretaker {
  private readonly history: Memento[] = [];

  save(originator: Originator): void {
    this.history.push(originator.createMemento());
  }

  /** Restores the most recent saved state; false if nothing was saved. */
  undo(originator: Originator): boolean {
    const last = this.history.pop();
    if (last === undefined) {
      return false;
    }
    originator.restore(last);
    return true;
  }
}
