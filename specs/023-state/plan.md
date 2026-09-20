# Implementation Plan: State

**Branch**: `023-state` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/state.md · snapshots/state/*.txt
java/.../patterns/state/ State ConcreteStateA ConcreteStateB Context StateExample (+ services line)
python/src/patterns/state/__init__.py · tests/test_state.py
typescript/src/state/{state.ts,example.ts,state.test.ts} (+ registry)
javascript/src/state/{state.js,example.js,state.test.js} (+ registry)
```

Design notes: `handle(context)` performs the transition by calling `context.setState(...)`; the context's `request()` records the state name before and after. Concrete states are stateless and constructed fresh in `handle` for simplicity (sharing is demonstrated in tests by passing one instance to two contexts).
