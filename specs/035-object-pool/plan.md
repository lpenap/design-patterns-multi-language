# Implementation Plan: Object Pool

**Branch**: `035-object-pool-<lang>` | **Date**: 2026-09-25 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS (one class per file, Principle IV).

```text
docs/patterns/object-pool.md · snapshots/object-pool/<lang>.txt
java/.../patterns/objectpool/ Reusable ObjectPool ObjectPoolExample (+ services line) · tests ObjectPoolTest, ObjectPoolExampleTest
python/src/patterns/objectpool/ reusable.py object_pool.py example.py __init__.py · tests/test_objectpool.py, test_objectpool_example.py
typescript/src/object-pool/ reusable.ts object-pool.ts example.ts (+ registry) · object-pool.test.ts, example.test.ts
javascript/src/object-pool/ reusable.js object-pool.js example.js (+ registry) · object-pool.test.js, example.test.js
```

Design notes: idle objects in a FIFO deque so every object is exercised evenly; the in-use collection is insertion-ordered for deterministic messages. `assign`/`reset` are package-private in Java and underscore-prefixed conventions elsewhere, so only the pool drives the lifecycle. The example is single-threaded: exhaustion refuses rather than blocks (a blocking pool is Producer/Consumer's bounded buffer).
