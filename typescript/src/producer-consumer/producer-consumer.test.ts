import { describe, expect, it } from "vitest";
import { BoundedBuffer } from "./bounded-buffer.ts";
import { Consumer } from "./consumer.ts";
import { POISON_PILL } from "./poison_pill.ts";
import { Producer } from "./producer.ts";
import { runTasks } from "./run-tasks.ts";

describe("BoundedBuffer (cooperative)", () => {
  it("is first in, first out", () => {
    const buffer = new BoundedBuffer<string>(3);
    expect(buffer.put("a").next().done).toBe(true);
    expect(buffer.put("b").next().done).toBe(true);
    expect(buffer.size()).toBe(2);
    expect(buffer.operationCount).toBe(2);
    expect(buffer.take().next().value).toBe("a");
    expect(buffer.take().next().value).toBe("b");
    expect(buffer.size()).toBe(0);
  });

  it("put yields while full until a take", () => {
    const buffer = new BoundedBuffer<number>(1);
    buffer.put(1).next();
    const blocked = buffer.put(2);
    expect(blocked.next().done).toBe(false); // would block
    expect(blocked.next().done).toBe(false); // still blocked
    expect(buffer.take().next().value).toBe(1);
    expect(blocked.next().done).toBe(true); // proceeds
    expect(buffer.take().next().value).toBe(2);
  });

  it("take yields while empty until a put", () => {
    const buffer = new BoundedBuffer<number>(1);
    const blocked = buffer.take();
    expect(blocked.next().done).toBe(false);
    buffer.put(7).next();
    const step = blocked.next();
    expect(step.done).toBe(true);
    expect(step.value).toBe(7);
  });
});

describe("runTasks", () => {
  it("consumes every item exactly once and stops consumers on the poison pill", () => {
    const buffer = new BoundedBuffer<number>(2);
    const c1 = new Consumer(buffer);
    const c2 = new Consumer(buffer);
    const producer = new Producer(buffer, [10, 20, 30, 40, POISON_PILL, POISON_PILL]);
    runTasks([c1.run(), c2.run(), producer.run()], buffer);
    expect([...c1.consumed, ...c2.consumed].sort((a, b) => a - b)).toEqual([10, 20, 30, 40]);
    expect(buffer.size()).toBe(0);
  });

  it("detects a deadlock when no task can progress", () => {
    const buffer = new BoundedBuffer<number>(1);
    const producer = new Producer(buffer, [1, 2, 3]); // no consumer: blocks after the first item
    expect(() => { runTasks([producer.run()], buffer); }).toThrow("deadlock: no task can make progress");
  });

  it("finishes immediately with no tasks", () => {
    expect(() => { runTasks([], new BoundedBuffer<number>(1)); }).not.toThrow();
  });
});

