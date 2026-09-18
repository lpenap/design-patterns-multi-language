/** The notification interface; push model: the change is carried in the call. */
export interface Observer {
  update(oldState: number, newState: number): void;
}

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

/** Holds the state of interest and notifies when it changes. */
export class ConcreteSubject extends Subject {
  private state = 0;

  getState(): number {
    return this.state;
  }

  setState(newState: number): void {
    if (newState === this.state) {
      return;
    }
    const oldState = this.state;
    this.state = newState;
    this.notifyObservers(oldState, newState);
  }
}

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
