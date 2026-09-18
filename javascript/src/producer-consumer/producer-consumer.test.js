import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { producerConsumerExample } from "./example.js";
import { BoundedBuffer, Consumer, POISON_PILL, Producer, runTasks } from "./producer-consumer.js";

describe("BoundedBuffer (cooperative)", () => {
  it("is first in, first out", () => {
    const buffer = new BoundedBuffer(3);
    assert.equal(buffer.put("a").next().done, true);
    assert.equal(buffer.put("b").next().done, true);
    assert.equal(buffer.size(), 2);
    assert.equal(buffer.operationCount, 2);
    assert.equal(buffer.take().next().value, "a");
    assert.equal(buffer.take().next().value, "b");
    assert.equal(buffer.size(), 0);
  });

  it("put yields while full until a take", () => {
    const buffer = new BoundedBuffer(1);
    buffer.put(1).next();
    const blocked = buffer.put(2);
    assert.equal(blocked.next().done, false);
    assert.equal(blocked.next().done, false);
    assert.equal(buffer.take().next().value, 1);
    assert.equal(blocked.next().done, true);
    assert.equal(buffer.take().next().value, 2);
  });

  it("take yields while empty until a put", () => {
    const buffer = new BoundedBuffer(1);
    const blocked = buffer.take();
    assert.equal(blocked.next().done, false);
    buffer.put(7).next();
    assert.deepEqual(blocked.next(), { done: true, value: 7 });
  });
});

describe("runTasks", () => {
  it("consumes every item exactly once and stops consumers on the poison pill", () => {
    const buffer = new BoundedBuffer(2);
    const c1 = new Consumer(buffer);
    const c2 = new Consumer(buffer);
    const producer = new Producer(buffer, [10, 20, 30, 40, POISON_PILL, POISON_PILL]);
    runTasks([c1.run(), c2.run(), producer.run()], buffer);
    assert.deepEqual([...c1.consumed, ...c2.consumed].sort((a, b) => a - b), [10, 20, 30, 40]);
    assert.equal(buffer.size(), 0);
  });

  it("detects a deadlock when no task can progress", () => {
    const buffer = new BoundedBuffer(1);
    assert.throws(() => runTasks([new Producer(buffer, [1, 2, 3]).run()], buffer), /deadlock: no task can make progress/);
  });

  it("finishes immediately with no tasks", () => {
    assert.doesNotThrow(() => runTasks([], new BoundedBuffer(1)));
  });
});

describe("example", () => {
  for (const run of [1, 2, 3]) {
    it(`prints the same lines on run ${run}`, () => {
      const out = new BufferOutput();
      producerConsumerExample.run(out);
      assert.equal(producerConsumerExample.id, "producer-consumer");
      assert.deepEqual(out.lines, [
        "Executing Producer/Consumer Pattern Implementation",
        "  Buffer capacity 2, 1 producer, 2 consumers",
        "  Produced: 1 2 3 4 5",
        "  Consumed: 1 2 3 4 5",
        "  Each item consumed exactly once: true",
      ]);
    });
  }
});
