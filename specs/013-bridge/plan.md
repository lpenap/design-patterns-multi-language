# Implementation Plan: Bridge

**Branch**: `013-bridge` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as Phase 2 specs; constitution check all PASS.

```text
docs/patterns/bridge.md · snapshots/bridge/*.txt
java/.../patterns/bridge/ Implementor ConcreteImplementorA ConcreteImplementorB Abstraction RefinedAbstraction BridgeExample (+ services line)
python/src/patterns/bridge/__init__.py · tests/test_bridge.py
typescript/src/bridge/{bridge.ts,example.ts,bridge.test.ts} (+ registry)
javascript/src/bridge/{bridge.js,example.js,bridge.test.js} (+ registry)
```

Design notes: `Abstraction` exposes the implementor to subclasses (`protected` in Java/TypeScript, `_implementor` in Python, a plain property in JavaScript) so `RefinedAbstraction` can extend behaviour without knowing the concrete implementor.
