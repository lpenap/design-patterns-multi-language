import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BufferOutput } from "../runtime/contract.js";
import { producerConsumerExample } from "./example.js";

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
