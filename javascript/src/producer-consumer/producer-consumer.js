// Producer/Consumer with cooperative tasks. JavaScript has no shared-memory
// threads in one realm, so `put` and `take` are generators that yield only
// when they would block, and a round-robin scheduler drives the tasks. Same
// wait/signal discipline as a monitor, without preemption, fully deterministic.

/** A sentinel item that tells one consumer to stop. */
export const POISON_PILL = -1;

export class BoundedBuffer {
  #capacity;
  #items = [];
  #operations = 0;

  constructor(capacity) {
    this.#capacity = capacity;
  }

  /** Number of completed puts and takes; the scheduler uses it to detect progress. */
  get operationCount() {
    return this.#operations;
  }

  /** Waits (yields) while the buffer is full, then appends the item. */
  *put(item) {
    while (this.#items.length >= this.#capacity) {
      yield;
    }
    this.#items.push(item);
    this.#operations++;
  }

  /** Waits (yields) while the buffer is empty, then removes the oldest item. */
  *take() {
    while (this.#items.length === 0) {
      yield;
    }
    this.#operations++;
    return this.#items.shift();
  }

  size() {
    return this.#items.length;
  }
}

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

/**
 * Round-robin scheduler: steps every live task once per round until all are
 * done. A round in which no buffer operation completed and no task finished
 * means every task is blocked: a deadlock.
 */
export function runTasks(tasks, buffer) {
  let live = [...tasks];
  while (live.length > 0) {
    const before = buffer.operationCount;
    const stillLive = live.filter((task) => !task.next().done);
    if (stillLive.length === live.length && buffer.operationCount === before) {
      throw new Error("deadlock: no task can make progress");
    }
    live = stillLive;
  }
}
