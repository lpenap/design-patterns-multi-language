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
