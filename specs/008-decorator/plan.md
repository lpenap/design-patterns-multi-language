# Implementation Plan: Decorator

**Branch**: `008-decorator` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

Same shape as specs 002–007; constitution check all PASS.

```text
docs/patterns/decorator.md · snapshots/decorator/*.txt
java/.../patterns/decorator/ Component ConcreteComponent Decorator ConcreteDecoratorA ConcreteDecoratorB DecoratorExample (+ services line)
python/src/patterns/decorator/__init__.py · tests/test_decorator.py
typescript/src/decorator/{decorator.ts,example.ts,decorator.test.ts} (+ registry)
javascript/src/decorator/{decorator.js,example.js,decorator.test.js} (+ registry)
```

Design notes: the abstract `Decorator` forwards `operation()` by default so concrete decorators only add behaviour (Java `abstract class` with a concrete forwarding method; Python base class; TypeScript `abstract class`; JavaScript base class). Concrete decorators call the base forwarding through the held component.
