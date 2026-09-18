# Implementation Plan: Chain of Responsibility

**Branch**: `009-chain-of-responsibility` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

Same shape as specs 002–008; constitution check all PASS.

```text
docs/patterns/chain-of-responsibility.md · snapshots/chain-of-responsibility/*.txt
java/.../patterns/chainofresponsibility/ Handler NegativeHandler ZeroHandler PositiveHandler ChainOfResponsibilityExample (+ services line)
python/src/patterns/chainofresponsibility/__init__.py · tests/test_chainofresponsibility.py
typescript/src/chain-of-responsibility/{chain-of-responsibility.ts,example.ts,chain-of-responsibility.test.ts} (+ registry)
javascript/src/chain-of-responsibility/{chain-of-responsibility.js,example.js,chain-of-responsibility.test.js} (+ registry)
```

Design notes: `Handler` is a concrete-enough base (successor field, `setNext` returning the successor, default `handle` forwarding or `unhandled`); it is declared abstract in Java and TypeScript, a plain base class in Python and JavaScript. Concrete handlers override `handle` and call the base for deferral.
