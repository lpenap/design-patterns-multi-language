/** Declares the interface for executing and undoing an operation. */
export interface Command {
  execute(): void;
  undo(): void;
  describe(): string;
}
