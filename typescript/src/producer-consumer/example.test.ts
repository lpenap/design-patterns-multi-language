import { describe, expect, it } from "vitest";
import { BufferOutput } from "../runtime/contract.ts";
import { producerConsumerExample } from "./example.ts";

describe("example", () => {
  it.each([1, 2, 3])("prints the same lines on run %i", () => {
    const out = new BufferOutput();
    producerConsumerExample.run(out);
    expect(producerConsumerExample.id).toBe("producer-consumer");
    expect(out.lines).toEqual([
      "Executing Producer/Consumer Pattern Implementation",
      "  Buffer capacity 2, 1 producer, 2 consumers",
      "  Produced: 1 2 3 4 5",
      "  Consumed: 1 2 3 4 5",
      "  Each item consumed exactly once: true",
    ]);
  });
});
