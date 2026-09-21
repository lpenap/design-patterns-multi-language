import type { Observer } from "./observer.ts";

/** Knows its observers and notifies them in attachment order. */
export class Subject {
  private readonly observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  protected notifyObservers(oldState: number, newState: number): void {
    for (const observer of [...this.observers]) {
      observer.update(oldState, newState);
    }
  }
}
