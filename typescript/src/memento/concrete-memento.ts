import type { Memento } from "./memento.ts";

/** The wide interface: lives in its own file and is imported only by the Originator, which alone reads the state. */
export class ConcreteMemento implements Memento {
  constructor(readonly state: string) {}
}
