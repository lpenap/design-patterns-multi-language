/** Declares the interface for executing and undoing an operation. */
export interface Command {
  execute(): void;
  undo(): void;
  describe(): string;
}

/** Knows how to perform the operations associated with a request. */
export class Receiver {
  private readonly words: string[] = [];

  action(word: string): void {
    this.words.push(word);
  }

  reverse(word: string): void {
    const last = this.words.lastIndexOf(word);
    if (last >= 0) {
      this.words.splice(last, 1);
    }
  }

  getState(): string {
    return this.words.join(" ");
  }
}

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
