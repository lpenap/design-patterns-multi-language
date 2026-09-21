import type { Mediator } from "./mediator.ts";

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
