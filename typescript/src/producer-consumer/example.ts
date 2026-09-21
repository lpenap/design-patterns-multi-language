import type { Example } from "../runtime/contract.ts";
import { BoundedBuffer } from "./bounded-buffer.ts";
import { Consumer } from "./consumer.ts";
import { POISON_PILL } from "./poison_pill.ts";
import { Producer } from "./producer.ts";
import { runTasks } from "./run-tasks.ts";

const CAPACITY = 2;
const CONSUMERS = 2;
const ITEMS = [1, 2, 3, 4, 5];

/** The coordinator: runs one producer and two consumers, then reports what never varies. */
export const producerConsumerExample: Example = {
  id: "producer-consumer",
  run(out) {
    out.line("Executing Producer/Consumer Pattern Implementation");
    out.line(`  Buffer capacity ${String(CAPACITY)}, 1 producer, ${String(CONSUMERS)} consumers`);

    const buffer = new BoundedBuffer<number>(CAPACITY);
    const consumers = Array.from({ length: CONSUMERS }, () => new Consumer(buffer));
    const pills = new Producer(buffer, Array.from({ length: CONSUMERS }, () => POISON_PILL));
    // The producer of items, then the poison pills once it is done, mirrors the
    // threaded versions where the coordinator sends the pills after join().
    function* produceThenStop(): Generator<void, void, undefined> {
      yield* new Producer(buffer, ITEMS).run();
      yield* pills.run();
    }
    runTasks([...consumers.map((c) => c.run()), produceThenStop()], buffer);

    const consumed = consumers.flatMap((c) => c.consumed).sort((a, b) => a - b);
    out.line(`  Produced: ${ITEMS.join(" ")}`);
    out.line(`  Consumed: ${consumed.join(" ")}`);
    out.line(`  Each item consumed exactly once: ${String(consumed.length === ITEMS.length && consumed.every((v, i) => v === ITEMS[i]))}`);
  },
};
