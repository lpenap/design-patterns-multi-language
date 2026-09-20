# Implementation Plan: Façade

**Branch**: `015-facade` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/facade.md · snapshots/facade/*.txt
java/.../patterns/facade/ SubsystemA SubsystemB SubsystemC Facade FacadeExample (+ services line)
python/src/patterns/facade/__init__.py · tests/test_facade.py
typescript/src/facade/{facade.ts,example.ts,facade.test.ts} (+ registry)
javascript/src/facade/{facade.js,example.js,facade.test.js} (+ registry)
```

Design notes: the façade creates its own subsystem objects (the common case) but a test-friendly constructor accepting them is unnecessary here; tests use the subsystems directly and the façade as a whole.
