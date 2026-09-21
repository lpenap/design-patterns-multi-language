import type { BoundedBuffer } from "./bounded-buffer.ts";
import type { Task } from "./task.ts";

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
