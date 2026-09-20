/** Defines the interface for communicating with colleagues. */
export interface Mediator {
  notify(sender: Colleague, message: string): void;
}

/** Knows its mediator and communicates with it, never with other colleagues. */
export abstract class Colleague {
  private readonly receivedMessages: string[] = [];

  constructor(private readonly mediator: Mediator) {}

  send(message: string): void {
    this.mediator.notify(this, message);
  }

  receive(message: string): void {
    this.receivedMessages.push(message);
  }

  received(): readonly string[] {
    return [...this.receivedMessages];
  }

  abstract name(): string;
}

export class ConcreteColleague1 extends Colleague {
  name(): string {
    return "ConcreteColleague1";
  }
}

export class ConcreteColleague2 extends Colleague {
  name(): string {
    return "ConcreteColleague2";
  }
}

/** Knows its colleagues and implements the cooperative behaviour: route to the other one. */
export class ConcreteMediator implements Mediator {
  private colleague1: Colleague | undefined;
  private colleague2: Colleague | undefined;

  setColleague1(colleague: Colleague): void {
    this.colleague1 = colleague;
  }

  setColleague2(colleague: Colleague): void {
    this.colleague2 = colleague;
  }

  notify(sender: Colleague, message: string): void {
    const target = sender === this.colleague1 ? this.colleague2 : this.colleague1;
    target?.receive(message);
  }
}
