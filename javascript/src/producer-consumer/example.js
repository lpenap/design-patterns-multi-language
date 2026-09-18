import { BoundedBuffer, Consumer, POISON_PILL, Producer, runTasks } from "./producer-consumer.js";

const CAPACITY = 2;
const CONSUMERS = 2;
const ITEMS = [1, 2, 3, 4, 5];

/** The coordinator: runs one producer and two consumers, then reports what never varies. */
export const producerConsumerExample = {
  id: "producer-consumer",
  run(out) {
    out.line("Executing Producer/Consumer Pattern Implementation");
    out.line(`  Buffer capacity ${CAPACITY}, 1 producer, ${CONSUMERS} consumers`);

    const buffer = new BoundedBuffer(CAPACITY);
    const consumers = Array.from({ length: CONSUMERS }, () => new Consumer(buffer));
    // The producer of items, then the poison pills once it is done, mirrors the
    // threaded versions where the coordinator sends the pills after join().
    function* produceThenStop() {
      yield* new Producer(buffer, ITEMS).run();
      yield* new Producer(buffer, Array(CONSUMERS).fill(POISON_PILL)).run();
    }
    runTasks([...consumers.map((c) => c.run()), produceThenStop()], buffer);

    const consumed = consumers.flatMap((c) => c.consumed).sort((a, b) => a - b);
    out.line(`  Produced: ${ITEMS.join(" ")}`);
    out.line(`  Consumed: ${consumed.join(" ")}`);
    out.line(`  Each item consumed exactly once: ${consumed.length === ITEMS.length && consumed.every((v, i) => v === ITEMS[i])}`);
  },
};
