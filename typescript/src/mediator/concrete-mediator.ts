import type { Colleague } from "./colleague.ts";
import type { Mediator } from "./mediator.ts";

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
