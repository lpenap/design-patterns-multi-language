---

description: "Task list template for adding one design pattern in all four languages"
---

# Tasks: [PATTERN NAME]

**Input**: `/specs/[###-pattern-id]/spec.md` and `plan.md`

**Prerequisites**: CLI runner and orchestrator (spec 001) merged; `catalog.yaml` present.

**Tests**: Mandatory (constitution Principle VI). Example tests assert exact output lines.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1 documentation, US2 implementations, US3 conformance

## Phase 1: Catalog and documentation skeleton

- [ ] T001 Add or complete the `[pattern-id]` entry in `catalog.yaml` (id, icon, name, category, intent, doc, parity, four implementation paths)
- [ ] T002 [US1] Create `docs/patterns/[pattern-id].md` with the nine-section outline and the Mermaid class diagram of the participants only
- [ ] T003 [P] [US1] Add any new references to `docs/references.md`

**Checkpoint**: `patterns validate` reports the four implementations as pending, nothing else.

---

## Phase 2: Implementations (one task group per language, all parallel)

### Java — `java/src/main/java/com/penapereira/patterns/[javapackage]/`

- [ ] T010 [P] [US2] Behaviour tests in `java/src/test/java/.../[javapackage]/[Name]Test.java` (fail first)
- [ ] T011 [P] [US2] Example test asserting exact lines in `[Name]ExampleTest.java` (fail first)
- [ ] T012 [US2] Implement participants with literature names
- [ ] T013 [US2] Implement `[Name]Example` and register it in `META-INF/services`
- [ ] T014 [US2] `./mvnw -q verify` green, coverage gate satisfied

### Python — `python/src/patterns/[pythonpackage]/`

- [ ] T020 [P] [US2] Behaviour tests in `python/tests/test_[pythonpackage].py` (fail first)
- [ ] T021 [P] [US2] Example test asserting exact lines (fail first)
- [ ] T022 [US2] Implement participants with literature names
- [ ] T023 [US2] Expose `example` in the package `__init__.py`
- [ ] T024 [US2] `uv run --project python pytest`, ruff and mypy green, coverage gate satisfied

### TypeScript — `typescript/src/[pattern-id]/`

- [ ] T030 [P] [US2] Behaviour tests in `typescript/src/[pattern-id]/[name].test.ts` (fail first)
- [ ] T031 [P] [US2] Example test asserting exact lines (fail first)
- [ ] T032 [US2] Implement participants with literature names
- [ ] T033 [US2] Export the Example and add it to `typescript/src/runtime/registry.ts`
- [ ] T034 [US2] `pnpm --filter typescript test`, tsc and eslint green, coverage gate satisfied

### JavaScript — `javascript/src/[pattern-id]/`

- [ ] T040 [P] [US2] Behaviour tests in `javascript/src/[pattern-id]/[name].test.js` (fail first)
- [ ] T041 [P] [US2] Example test asserting exact lines (fail first)
- [ ] T042 [US2] Implement participants idiomatically (closures, prototypes or classes as fits)
- [ ] T043 [US2] Export the Example and add it to `javascript/src/runtime/registry.js`
- [ ] T044 [US2] `pnpm --filter javascript test` and eslint green, coverage gate satisfied

**Checkpoint**: `<runner> run [pattern-id]` works in all four languages.

---

## Phase 3: Conformance and documentation completion

- [ ] T050 [US3] `patterns snapshot --update` for `[pattern-id]`; review the four files for identical content (or document the `loose` differences)
- [ ] T051 [US1] Complete the Participants table with links to each language's class or function; write The example with the output block equal to the snapshot; write Language notes
- [ ] T052 [US3] `patterns validate` and `patterns check` green
- [ ] T053 [US3] `patterns validate --write-readme` to regenerate the README catalogue table
- [ ] T054 Review the diagram against the constitution's rule (participants only) and the doc against the outline

**Checkpoint**: definition of done (PLAN.md §7.4) fully satisfied; ready to merge into `master`.

---

## Dependencies & Execution Order

- Phase 1 before Phase 2 (the catalog entry is what `validate` and the runners key on).
- The four language groups in Phase 2 are independent and can be done in any order or in parallel; within a group, tests before implementation.
- Phase 3 after all four groups: snapshots need all four outputs.

## Notes

- Keep every example to a handful of lines and under a second.
- Names in code follow the literature roles listed in the spec, in all four languages.
- Anything language-specific goes into the doc's Language notes, not into the neutral sections.
