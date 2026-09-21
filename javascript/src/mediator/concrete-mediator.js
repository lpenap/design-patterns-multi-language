/** Knows its colleagues and implements the cooperative behaviour: route to the other one. */
export class ConcreteMediator {
  #colleague1;
  #colleague2;

  setColleague1(colleague) {
    this.#colleague1 = colleague;
  }

  setColleague2(colleague) {
    this.#colleague2 = colleague;
  }

  notify(sender, message) {
    const target = sender === this.#colleague1 ? this.#colleague2 : this.#colleague1;
    target?.receive(message);
  }
}
