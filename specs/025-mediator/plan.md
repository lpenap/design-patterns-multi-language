# Implementation Plan: Mediator

**Branch**: `025-mediator` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/mediator.md · snapshots/mediator/*.txt
java/.../patterns/mediator/ Mediator Colleague ConcreteColleague1 ConcreteColleague2 ConcreteMediator MediatorExample (+ services line)
python/src/patterns/mediator/__init__.py · tests/test_mediator.py
typescript/src/mediator/{mediator.ts,example.ts,mediator.test.ts} (+ registry)
javascript/src/mediator/{mediator.js,example.js,mediator.test.js} (+ registry)
```

Design notes: the mediator is created first, colleagues are constructed with it, then registered on it (`setColleague1/2`), the two-phase wiring GoF's example uses. `Colleague` is an abstract base (Java, TypeScript) or a plain base class (Python, JavaScript) with the name supplied by subclasses.
