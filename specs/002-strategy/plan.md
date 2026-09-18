# Implementation Plan: Strategy

**Branch**: `002-strategy` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

## Summary

Add the first pattern to the repository: Strategy in Java, Python, TypeScript
and JavaScript, its academic document with a participants-only Mermaid
diagram, four snapshots, catalog entry and README row. Java is a move from the
original project with the participants renamed to the literature's names; the
other three are fresh idiomatic implementations that produce byte-identical
output.

## Technical Context

**Language/Version**: as fixed in Phase 0 (Java 25, Python 3.12+, TypeScript 6.0.3, JavaScript ES2022).

**Primary Dependencies**: none; standard libraries only.

**Testing**: JUnit 6, pytest, vitest, node:test — behaviour tests (delegation and run-time switch) plus exact-lines example tests in each language.

**Constraints**: participant names `Strategy`, `ConcreteStrategyA`, `ConcreteStrategyB`, `Context`; output byte-identical across languages; no host plumbing in the diagram.

**Scale/Scope**: ~5 source files and 2 test files per language; one doc; four snapshots.

## Constitution Check

| Principle | Status |
|---|---|
| I catalog / language-first | PASS — one `strategy` folder per language, catalog entry with four paths |
| II example contract | PASS — `StrategyExample` / `example` registered through ServiceLoader, package import, registries |
| III output conventions & parity | PASS — heading + two indented lines, strict parity |
| IV idiomatic, literature names | PASS — explicit classes kept so the structure is visible; idioms described in Language notes |
| V documentation | PASS — nine sections, Mermaid participants only |
| VI quality gates | PASS — behaviour + example tests per language; coverage gates already enforced |

No violations.

## Project Structure

```text
docs/patterns/strategy.md
snapshots/strategy/{java,python,typescript,javascript}.txt
catalog.yaml                                      strategy: implementations filled in

java/src/main/java/com/penapereira/patterns/strategy/
  Strategy.java  ConcreteStrategyA.java  ConcreteStrategyB.java  Context.java  StrategyExample.java
java/src/main/resources/META-INF/services/com.penapereira.patterns.runtime.Example   (+1 line)
java/src/test/java/com/penapereira/patterns/strategy/StrategyTest.java  StrategyExampleTest.java

python/src/patterns/strategy/__init__.py          Strategy (Protocol), ConcreteStrategyA, ConcreteStrategyB, Context, StrategyExample, example
python/tests/test_strategy.py

typescript/src/strategy/strategy.ts               Strategy, ConcreteStrategyA, ConcreteStrategyB, Context
typescript/src/strategy/example.ts                strategyExample
typescript/src/strategy/strategy.test.ts
typescript/src/runtime/registry.ts                (+1 import, +1 entry)

javascript/src/strategy/strategy.js  example.js  strategy.test.js
javascript/src/runtime/registry.js                (+1 import, +1 entry)
```

## Design notes (research)

- **R1 Java move**: copy the four classes from the original `strategy` package, rename `StrategyImpl1/2` → `ConcreteStrategyA/B`, make fields private/final where the original left them package-private, replace the SLF4J runner with `StrategyExample implements Example` writing through `Output`. Register in the production services file.
- **R2 Python**: `Strategy` as a `Protocol` with `execute_algorithm() -> str`; two plain classes; `Context` with `operation()` and `set_strategy()`. `example = StrategyExample()` at package level for discovery. Snake_case method names are the idiom; the doc's participants table maps them.
- **R3 TypeScript**: `interface Strategy { executeAlgorithm(): string }`, two classes, `Context` with a private field and `setStrategy`. `strategyExample: Example` in `example.ts`; registry gets `import { strategyExample } from "../strategy/example.ts"` and lists it.
- **R4 JavaScript**: same shape with plain classes and duck typing (no interface); the doc's Language notes point out that any object with `executeAlgorithm()` qualifies.
- **R5 Output**: exactly the block in spec.md; recorded with `make snapshot`, then `make check` must report `4 ok`.
- **R6 Doc**: adapt the original README (Intent, Motivation, Consequences, Related, References already written) to the neutral outline; PlantUML → Mermaid; add Participants columns and Language notes.

## Quickstart (validation)

```bash
make test && make lint
make snapshot                 # 4 written
make check                    # check: 4 ok, 0 drift, 0 mismatch, 0 failed
make validate --write-readme  # or: node tools/runner/bin/patterns.js validate --write-readme
make run P=strategy           # four identical blocks
```
