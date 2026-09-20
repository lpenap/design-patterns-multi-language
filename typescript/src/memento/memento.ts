/** The narrow interface: everyone but the originator sees an opaque token. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Memento {}

/** The wide interface: module-private, so only this file's Originator can read the state. */
class ConcreteMemento implements Memento {
  constructor(readonly state: string) {}
}

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
