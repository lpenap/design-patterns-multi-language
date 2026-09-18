# Implementation Plan: Simple Factory

**Branch**: `005-simple-factory` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

Same shape as specs 002–004; constitution check all PASS.

```text
docs/patterns/simple-factory.md · snapshots/simple-factory/*.txt
java/.../patterns/simplefactory/ Product ConcreteProductA ConcreteProductB SimpleFactory SimpleFactoryExample (+ services line)
python/src/patterns/simplefactory/__init__.py · tests/test_simplefactory.py
typescript/src/simple-factory/{simple-factory.ts,example.ts,simple-factory.test.ts} (+ registry)
javascript/src/simple-factory/{simple-factory.js,example.js,simple-factory.test.js} (+ registry)
```

Design notes: Java uses a `switch` expression with a `default` throwing `IllegalArgumentException`; Python a `match` statement raising `ValueError`; TypeScript a `switch` on a `"A" | "B"`-typed parameter widened to `string` for the runtime check; JavaScript a `switch` throwing `Error`. Language notes contrast this with the dict-of-classes idiom in Python and JavaScript and with sealed hierarchies in Java.
