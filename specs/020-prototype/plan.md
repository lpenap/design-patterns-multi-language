# Implementation Plan: Prototype

**Branch**: `020-prototype` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/prototype.md · snapshots/prototype/*.txt
java/.../patterns/prototype/ Prototype ConcretePrototype1 ConcretePrototype2 PrototypeExample (+ services line)
python/src/patterns/prototype/__init__.py · tests/test_prototype.py
typescript/src/prototype/{prototype.ts,example.ts,prototype.test.ts} (+ registry)
javascript/src/prototype/{prototype.js,example.js,prototype.test.js} (+ registry)
```

Design notes: `clone()` is a covariant copy in Java (`ConcretePrototype1 clone()`), `copy.copy(self)` in Python, `new ConcretePrototype1(this.state)` in TypeScript and JavaScript. State is a single string so shallow and deep copy coincide; the doc explains when they do not.
