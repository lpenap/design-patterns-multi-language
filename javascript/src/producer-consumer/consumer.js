import { POISON_PILL } from "./poison-pill.js";

/** Takes items until it takes the poison pill, recording each. */
export class Consumer {
  #buffer;
  consumed = [];

  constructor(buffer) {
    this.#buffer = buffer;
  }

  *run() {
    for (;;) {
      const item = yield* this.#buffer.take();
      if (item === POISON_PILL) {
        return;
      }
      this.consumed.push(item);
    }
  }
}
