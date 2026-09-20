# Implementation Plan: Flyweight

**Branch**: `016-flyweight` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/flyweight.md · snapshots/flyweight/*.txt
java/.../patterns/flyweight/ Flyweight ConcreteFlyweight FlyweightFactory FlyweightExample (+ services line)
python/src/patterns/flyweight/__init__.py · tests/test_flyweight.py
typescript/src/flyweight/{flyweight.ts,example.ts,flyweight.test.ts} (+ registry)
javascript/src/flyweight/{flyweight.js,example.js,flyweight.test.js} (+ registry)
```

Design notes: the pool is a map from key to flyweight (`HashMap`/`dict`/`Map`); `computeIfAbsent`, `setdefault`-style get-or-create. Intrinsic state is the key itself here (a one-character string), which keeps the example small.
