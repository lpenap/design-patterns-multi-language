import type { Command } from "./command.ts";

/** Asks commands to carry out requests and keeps the history for undo. */
export class Invoker {
  private readonly history: Command[] = [];

  execute(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  /** Undoes the most recent command and returns it, or undefined if there is none. */
  undo(): Command | undefined {
    const last = this.history.pop();
    last?.undo();
    return last;
  }
}
