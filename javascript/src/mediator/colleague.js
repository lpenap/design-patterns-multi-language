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
