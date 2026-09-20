# Implementation Plan: Memento

**Branch**: `026-memento` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/memento.md · snapshots/memento/*.txt
java/.../patterns/memento/ Originator (with nested Memento) Caretaker MementoExample (+ services line)
python/src/patterns/memento/__init__.py · tests/test_memento.py
typescript/src/memento/{memento.ts,example.ts,memento.test.ts} (+ registry)
javascript/src/memento/{memento.js,example.js,memento.test.js} (+ registry)
```

Design notes: Java nests `Memento` inside `Originator` as a `public static final class` with a private field, so only the originator reads it. TypeScript exports an empty `Memento` interface and keeps `ConcreteMemento` module-private; `restore` narrows with `instanceof`. Python and JavaScript rely on the `_state`/`#state` convention plus a getter used only by the originator.
