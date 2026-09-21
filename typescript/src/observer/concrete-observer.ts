import type { Observer } from "./observer.ts";

/** Reports the change it was told about through a callback supplied by its creator. */
export class ConcreteObserver implements Observer {
  constructor(
    private readonly name: string,
    private readonly report: (text: string) => void,
  ) {}

  update(oldState: number, newState: number): void {
    this.report(`${this.name} notified: state ${String(oldState)} -> ${String(newState)}`);
  }
}
