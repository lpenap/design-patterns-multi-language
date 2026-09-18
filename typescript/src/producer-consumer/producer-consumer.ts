/**
 * Producer/Consumer with cooperative tasks. JavaScript has no shared-memory
 * threads in one realm, so `put` and `take` are generators that yield only
 * when they would block, and a round-robin scheduler drives the tasks. Same
 * wait/signal discipline as a monitor, without preemption, fully deterministic.
 */

/** A task yields whenever it would block; it is done when its generator returns. */
export type Task = Generator<void, void, undefined>;

/** A sentinel item that tells one consumer to stop. */
export const POISON_PILL = -1;

export class BoundedBuffer<T> {
  private readonly items: T[] = [];
  private operations = 0;

  constructor(private readonly capacity: number) {}

  /** Number of completed puts and takes; the scheduler uses it to detect progress. */
  get operationCount(): number {
    return this.operations;
  }

  /** Waits (yields) while the buffer is full, then appends the item. */
  *put(item: T): Generator<void, void, undefined> {
    while (this.items.length >= this.capacity) {
      yield;
    }
    this.items.push(item);
    this.operations++;
  }

  /** Waits (yields) while the buffer is empty, then removes the oldest item. */
  *take(): Generator<void, T, undefined> {
    while (this.items.length === 0) {
      yield;
    }
    this.operations++;
    return this.items.shift() as T;
  }

  size(): number {
    return this.items.length;
  }
}

/** Puts its items into the buffer in order. */
export class Producer {
  constructor(
    private readonly buffer: BoundedBuffer<number>,
    private readonly items: readonly number[],
  ) {}

  *run(): Task {
    for (const item of this.items) {
      yield* this.buffer.put(item);
    }
  }
}

/** Takes items until it takes the poison pill, recording each. */
export class Consumer {
  readonly consumed: number[] = [];

  constructor(private readonly buffer: BoundedBuffer<number>) {}

  *run(): Task {
    for (;;) {
      const item = yield* this.buffer.take();
      if (item === POISON_PILL) {
        return;
      }
      this.consumed.push(item);
    }
  }
}

/**
 * Round-robin scheduler: steps every live task once per round until all are
 * done. Progress is measured by the buffer's completed operations; a round in
 * which none completed and no task finished means every task is blocked: a
 * deadlock.
 */
export function runTasks(tasks: readonly Task[], buffer: BoundedBuffer<unknown>): void {
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
