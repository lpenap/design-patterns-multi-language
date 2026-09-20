// Command: encapsulate a request as an object, with undo.
// A command is any object with execute(), undo() and describe().

/** Knows how to perform the operations associated with a request. */
export class Receiver {
  #words = [];

  action(word) {
    this.#words.push(word);
  }

  reverse(word) {
    const last = this.#words.lastIndexOf(word);
    if (last >= 0) {
      this.#words.splice(last, 1);
    }
  }

  getState() {
    return this.#words.join(" ");
  }
}

/** Binds a receiver to an action and knows how to reverse it. */
export class ConcreteCommand {
  #receiver;
  #word;

  constructor(receiver, word) {
    this.#receiver = receiver;
    this.#word = word;
  }

  execute() {
    this.#receiver.action(this.#word);
  }

  undo() {
    this.#receiver.reverse(this.#word);
  }

  describe() {
    return `ConcreteCommand(${this.#word})`;
  }
}

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
