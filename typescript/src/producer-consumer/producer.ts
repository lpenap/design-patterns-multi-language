import type { BoundedBuffer } from "./bounded-buffer.ts";
import type { Task } from "./task.ts";

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
