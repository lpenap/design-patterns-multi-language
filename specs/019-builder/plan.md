# Implementation Plan: Builder

**Branch**: `019-builder` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/builder.md · snapshots/builder/*.txt
java/.../patterns/builder/ Product Builder ConcreteBuilder Director BuilderExample (+ services line)
python/src/patterns/builder/__init__.py · tests/test_builder.py
typescript/src/builder/{builder.ts,example.ts,builder.test.ts} (+ registry)
javascript/src/builder/{builder.js,example.js,builder.test.js} (+ registry)
```

Design notes: `Director.construct(builder)` takes the builder as a parameter (GoF passes it at construction; a parameter keeps the director stateless and the example short). `ConcreteBuilder` starts a fresh product on construction.
