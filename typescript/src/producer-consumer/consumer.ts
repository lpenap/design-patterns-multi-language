import type { BoundedBuffer } from "./bounded-buffer.ts";
import { POISON_PILL } from "./poison_pill.ts";
import type { Task } from "./task.ts";

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
