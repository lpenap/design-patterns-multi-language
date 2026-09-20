# Implementation Plan: Iterator

**Branch**: `024-iterator` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/iterator.md · snapshots/iterator/*.txt
java/.../patterns/iterator/ Iterator Aggregate ConcreteIterator ConcreteAggregate IteratorExample (+ services line)
python/src/patterns/iterator/__init__.py · tests/test_iterator.py
typescript/src/iterator/{iterator.ts,example.ts,iterator.test.ts} (+ registry)
javascript/src/iterator/{iterator.js,example.js,iterator.test.js} (+ registry)
```

Design notes: the concrete iterator holds the aggregate and an index; `ConcreteAggregate.get(i)` is package-level access for the iterator. Past-the-end errors: `NoSuchElementException`, `StopIteration`, `Error("no more elements")`.
