---

description: "Task list for spec 002 — Strategy"
---

# Tasks: Strategy

**Input**: `/specs/002-strategy/spec.md` and `plan.md`

**Prerequisites**: CLI runner and orchestrator (spec 001) merged; `catalog.yaml` present.

**Tests**: Mandatory (constitution Principle VI). Example tests assert exact output lines.

## Format: `[ID] [P?] [Story] Description`

- **[Story]**: US1 documentation, US2 implementations, US3 conformance

## Phase 1: Catalog and documentation skeleton

- [x] T001 Fill the `strategy` entry in `catalog.yaml`: implementations `java: java/src/main/java/com/penapereira/patterns/strategy`, `python: python/src/patterns/strategy`, `typescript: typescript/src/strategy`, `javascript: javascript/src/strategy`
- [x] T002 [US1] Create `docs/patterns/strategy.md` from the original README with the nine-section outline and a Mermaid class diagram of Strategy, ConcreteStrategyA, ConcreteStrategyB, Context (Client as a generic box)

**Checkpoint**: `patterns validate` reports the four implementations' snapshots as missing, nothing else.

---

## Phase 2: Implementations (four independent groups)

### Java — `java/src/main/java/com/penapereira/patterns/strategy/`

- [x] T010 [P] [US2] `java/src/test/java/com/penapereira/patterns/strategy/StrategyTest.java`: operation delegates to the configured strategy; switching changes the next result (fail first)
- [x] T011 [P] [US2] `StrategyExampleTest.java`: id is `strategy`; exact three lines through a buffer output (fail first)
- [x] T012 [US2] `Strategy.java`, `ConcreteStrategyA.java`, `ConcreteStrategyB.java`, `Context.java` (moved and renamed from the original project)
- [x] T013 [US2] `StrategyExample.java` and its line in `java/src/main/resources/META-INF/services/com.penapereira.patterns.runtime.Example`
- [x] T014 [US2] `./mvnw -q verify` green; `java -jar java/target/patterns.jar run strategy` prints the expected block

### Python — `python/src/patterns/strategy/`

- [x] T020 [P] [US2] `python/tests/test_strategy.py`: behaviour tests and exact-lines example test (fail first)
- [x] T021 [US2] `python/src/patterns/strategy/__init__.py`: `Strategy` Protocol, `ConcreteStrategyA`, `ConcreteStrategyB`, `Context`, `StrategyExample`, module-level `example`
- [x] T022 [US2] `uv run pytest`, ruff, mypy green; `uv run patterns run strategy` prints the expected block

### TypeScript — `typescript/src/strategy/`

- [x] T030 [P] [US2] `typescript/src/strategy/strategy.test.ts`: behaviour tests and exact-lines example test (fail first)
- [x] T031 [US2] `strategy.ts` (interface + two classes + Context) and `example.ts` (`strategyExample`)
- [x] T032 [US2] Add `strategyExample` to `typescript/src/runtime/registry.ts`; `pnpm test` and `pnpm lint` green; `pnpm exec tsx src/cli.ts run strategy` prints the expected block

### JavaScript — `javascript/src/strategy/`

- [x] T040 [P] [US2] `javascript/src/strategy/strategy.test.js`: behaviour tests and exact-lines example test (fail first)
- [x] T041 [US2] `strategy.js` (two classes + Context, duck-typed strategy) and `example.js` (`strategyExample`)
- [x] T042 [US2] Add `strategyExample` to `javascript/src/runtime/registry.js`; `pnpm test` and `pnpm lint` green; `node src/cli.js run strategy` prints the expected block

**Checkpoint**: `make run P=strategy` prints four identical blocks.

---

## Phase 3: Conformance and documentation completion

- [x] T050 [US3] `make snapshot`: four files written under `snapshots/strategy/`; review they are identical
- [x] T051 [US1] Complete `docs/patterns/strategy.md`: Participants table with links to each language's class, The example block equal to the snapshot, Language notes (lambda / function / function type idioms)
- [x] T052 [US3] `make validate` and `make check` green
- [x] T053 [US3] `node tools/runner/bin/patterns.js validate --write-readme` regenerates the README row (`done` × 4)
- [x] T054 Review the diagram against the constitution's rule (participants only) and the doc against the outline; commit; push branch; workflows green

**Checkpoint**: definition of done (PLAN.md §7.4) fully satisfied; merge into `master`.
