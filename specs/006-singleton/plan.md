# Implementation Plan: Singleton

**Branch**: `006-singleton` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

Same shape as specs 002–005; constitution check all PASS.

```text
docs/patterns/singleton.md · snapshots/singleton/*.txt
java/.../patterns/singleton/ Singleton SingletonExample (+ services line)
python/src/patterns/singleton/__init__.py · tests/test_singleton.py
typescript/src/singleton/{singleton.ts,example.ts,singleton.test.ts} (+ registry)
javascript/src/singleton/{singleton.js,example.js,singleton.test.js} (+ registry)
```

Design notes: textbook lazy initialisation in every language (private static field, `instance()` class operation). Java and TypeScript hide the constructor (`private`). Python cannot: `instance()` is a `@classmethod` and the doc explains the module-level-instance and `__new__` idioms. JavaScript uses a `static #uniqueInstance` private field; the constructor stays reachable and the doc says so. The example compares identity (`==`, `is`, `===`) of two `instance()` calls.
