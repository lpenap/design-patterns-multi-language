# Implementation Plan: Interpreter

**Branch**: `028-interpreter` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Same shape as previous specs; constitution check all PASS.

```text
docs/patterns/interpreter.md · snapshots/interpreter/*.txt
java/.../patterns/interpreter/ AbstractExpression NumberExpression VariableExpression AddExpression SubtractExpression Context InterpreterExample (+ services line)
python/src/patterns/interpreter/__init__.py · tests/test_interpreter.py
typescript/src/interpreter/{interpreter.ts,example.ts,interpreter.test.ts} (+ registry)
javascript/src/interpreter/{interpreter.js,example.js,interpreter.test.js} (+ registry)
```

Design notes: the abstract syntax tree is a Composite of expressions; `interpret` is recursive. Unknown variables: `NoSuchElementException` (Java), `KeyError` (Python), `Error` (TypeScript, JavaScript), each naming the variable.
