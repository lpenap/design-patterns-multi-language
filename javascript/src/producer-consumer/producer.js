/** Puts its items into the buffer in order. */
export class Producer {
  #buffer;
  #items;

  constructor(buffer, items) {
    this.#buffer = buffer;
    this.#items = items;
  }

  *run() {
    for (const item of this.#items) {
      yield* this.#buffer.put(item);
    }
  }
}
