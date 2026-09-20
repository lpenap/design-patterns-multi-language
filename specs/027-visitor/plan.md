# Implementation Plan: Visitor

**Branch**: `027-visitor` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/visitor.md · snapshots/visitor/*.txt
java/.../patterns/visitor/ Visitor Element ConcreteElementA ConcreteElementB ConcreteVisitor1 ConcreteVisitor2 ObjectStructure VisitorExample (+ services line)
python/src/patterns/visitor/__init__.py · tests/test_visitor.py
typescript/src/visitor/{visitor.ts,example.ts,visitor.test.ts} (+ registry)
javascript/src/visitor/{visitor.js,example.js,visitor.test.js} (+ registry)
```

Design notes: classic double dispatch; visitors accumulate into a list and expose `result()`. Python's Language notes mention `functools.singledispatch` as the alternative; TypeScript's mention discriminated-union `switch` exhaustiveness.
