# Implementation Plan: Null Object

**Branch**: `036-null-object-<lang>` | **Date**: 2026-09-25 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS (one class per file, Principle IV).

```text
docs/patterns/null-object.md · snapshots/null-object/<lang>.txt
java/.../patterns/nullobject/ Logger OutputLogger NullLogger OrderProcessor NullObjectExample (+ services line) · tests NullObjectTest, NullObjectExampleTest
python/src/patterns/nullobject/ logger.py output_logger.py null_logger.py order_processor.py example.py __init__.py · tests/test_nullobject.py, test_nullobject_example.py
typescript/src/null-object/ logger.ts output-logger.ts null-logger.ts order-processor.ts example.ts (+ registry) · null-object.test.ts, example.test.ts
javascript/src/null-object/ output-logger.js null-logger.js order-processor.js example.js (+ registry) · null-object.test.js, example.test.js
```

Design notes: the real logger writes through the example's `Output` so the log lines are part of the deterministic output; the null logger is a plain class in every language (not a singleton) so the four implementations stay alike, with the singleton idiom mentioned in the language notes.
