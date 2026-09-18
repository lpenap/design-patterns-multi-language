# Implementation Plan: Observer

**Branch**: `010-observer` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

Same shape as specs 002–009; constitution check all PASS.

```text
docs/patterns/observer.md · snapshots/observer/*.txt
java/.../patterns/observer/ Observer Subject ConcreteSubject ConcreteObserver ObserverExample (+ services line)
python/src/patterns/observer/__init__.py · tests/test_observer.py
typescript/src/observer/{observer.ts,example.ts,observer.test.ts} (+ registry)
javascript/src/observer/{observer.js,example.js,observer.test.js} (+ registry)
```

Design notes: `Subject` is a concrete base holding a list (Java `List`, Python `list`, TS/JS array); `detach` removes by identity. `ConcreteSubject` holds an `int` state initialised to 0. `ConcreteObserver(name, report)` formats the message and calls `report`. The example passes `text -> out.line("  " + text)`.
