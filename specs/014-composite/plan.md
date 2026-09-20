# Implementation Plan: Composite

**Branch**: `014-composite` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/composite.md · snapshots/composite/*.txt
java/.../patterns/composite/ Component Leaf Composite CompositeExample (+ services line)
python/src/patterns/composite/__init__.py · tests/test_composite.py
typescript/src/composite/{composite.ts,example.ts,composite.test.ts} (+ registry)
javascript/src/composite/{composite.js,example.js,composite.test.js} (+ registry)
```

Design notes: safe variant (child management on Composite). `add` returns the composite so trees can be built in one expression. Children are kept in insertion order.
