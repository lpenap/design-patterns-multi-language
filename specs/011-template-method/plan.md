# Implementation Plan: Template Method

**Branch**: `011-template-method` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

Same shape as specs 002–010; constitution check all PASS.

```text
docs/patterns/template-method.md · snapshots/template-method/*.txt
java/.../patterns/templatemethod/ AbstractClass ConcreteClassA ConcreteClassB TemplateMethodExample (+ services line)
python/src/patterns/templatemethod/__init__.py · tests/test_templatemethod.py
typescript/src/template-method/{template-method.ts,example.ts,template-method.test.ts} (+ registry)
javascript/src/template-method/{template-method.js,example.js,template-method.test.js} (+ registry)
```

Design notes: `templateMethod()` is `final` in Java; TypeScript has no `final`, so the doc notes it; Python uses `abc.ABC` with `@abstractmethod` for the primitive operations and a concrete `hook`; JavaScript's base primitive operations throw.
