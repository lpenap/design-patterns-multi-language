/** Asks commands to carry out requests and keeps the history for undo. */
export class Invoker {
  #history = [];

  execute(command) {
    command.execute();
    this.#history.push(command);
  }

  /** Undoes the most recent command and returns it, or undefined if there is none. */
  undo() {
    const last = this.#history.pop();
    last?.undo();
    return last;
  }
}
