// Mediator: colleagues interact only through one object that encodes the rules.
// A mediator is any object with notify(sender, message).

/** Knows its mediator and communicates with it, never with other colleagues. */
export class Colleague {
  #mediator;
  #received = [];

  constructor(mediator) {
    this.#mediator = mediator;
  }

  send(message) {
    this.#mediator.notify(this, message);
  }

  receive(message) {
    this.#received.push(message);
  }

  received() {
    return [...this.#received];
  }

  name() {
    return this.constructor.name;
  }
}

export class ConcreteColleague1 extends Colleague {}

export class ConcreteColleague2 extends Colleague {}

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
