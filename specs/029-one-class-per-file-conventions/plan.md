# Implementation Plan: One Class per File — Conventions and Validator

**Branch**: `029-one-class-per-file-conventions` | **Date**: 2026-09-20 | **Spec**: [spec.md](spec.md)

Constitution check: this spec amends the constitution (Governance: MINOR bump to 1.1.0, reason recorded in the commit). All other principles PASS.

```text
.specify/memory/constitution.md          Principle IV paragraph; version 1.1.0
docs/conventions.md                      "File layout" section
.specify/templates/pattern-spec-template.md, pattern-tasks-template.md
tools/runner/src/structure.ts            declaration scan + name check per language
tools/runner/src/structure.test.ts
tools/runner/src/commands/validate.ts    calls the check; ONE_CLASS_PER_FILE_LEVEL = "warning"
tools/runner/tests/fixtures/{python,typescript,java}/alpha/...   files exercising the rules
```

Design notes: declarations are matched at column 0 only, so nested and indented types are ignored. Name conversion: insert a separator before an upper-case letter that follows a lower-case letter or digit, then lower-case (`ConcreteStrategyA` → `concrete_strategy_a` / `concrete-strategy-a`; `ProductA1` → `product_a1`).
