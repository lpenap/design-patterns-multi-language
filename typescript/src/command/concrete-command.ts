import type { Command } from "./command.ts";
import type { Receiver } from "./receiver.ts";

/** Binds a receiver to an action and knows how to reverse it. */
export class ConcreteCommand implements Command {
  constructor(
    private readonly receiver: Receiver,
    private readonly word: string,
  ) {}

  execute(): void {
    this.receiver.action(this.word);
  }

  undo(): void {
    this.receiver.reverse(this.word);
  }

  describe(): string {
    return `ConcreteCommand(${this.word})`;
  }
}
