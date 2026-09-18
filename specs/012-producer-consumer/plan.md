# Implementation Plan: Producer/Consumer

**Branch**: `012-producer-consumer` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

Constitution check: all PASS. Principle III (deterministic output) is satisfied by printing a summary instead of interleaving; parity becomes strict.

```text
docs/patterns/producer-consumer.md · snapshots/producer-consumer/*.txt
java/.../patterns/producerconsumer/ BoundedBuffer Producer Consumer ProducerConsumerExample (+ services line)
python/src/patterns/producerconsumer/__init__.py · tests/test_producerconsumer.py
typescript/src/producer-consumer/{producer-consumer.ts,example.ts,producer-consumer.test.ts} (+ registry)
javascript/src/producer-consumer/{producer-consumer.js,example.js,producer-consumer.test.js} (+ registry)
```

Design notes:
- **Java**: `BoundedBuffer<T>` with `ReentrantLock` and two `Condition`s (`notFull`, `notEmpty`), `ArrayDeque` storage. Producer and Consumer implement `Runnable`; the coordinator uses plain `Thread`s and `join()`. Poison pill `Consumer.POISON_PILL = -1`. Consumed items go to a `ConcurrentLinkedQueue<Integer>`.
- **Python**: `BoundedBuffer` with `threading.Condition` over a `collections.deque`; `threading.Thread` per role; poison pill `None`... kept as `-1` for parity of concept.
- **TypeScript/JavaScript**: `BoundedBuffer` whose `put`/`take` are generator functions that `yield` while they would block; `Producer.run()` and `Consumer.run()` are generators that `yield*` those; `runTasks(tasks)` round-robins `next()` over live generators and throws `Error("deadlock: no task can make progress")` when a full round advances nothing. Determinism is total.
- Tests use short timeouts (≤ 1 s) for the blocking cases in Java and Python; in TS/JS blocking is observable step by step.
