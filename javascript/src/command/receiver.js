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
