---

description: "Task list for spec 001 — CLI runner"
---

# Tasks: CLI Runner

**Input**: Design documents from `/specs/001-cli-runner/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/language-cli.md, contracts/orchestrator.md, quickstart.md

**Tests**: Mandatory (constitution VI). Every language gets behaviour tests of the runtime plus exact-lines tests of the CLI function; the orchestrator is tested against `tools/runner/tests/fixtures/`. Tests are written first and must fail before the implementation task that follows them.

**Organization**: Setup and Foundational first; then the per-language CLIs, which together deliver US1–US3 (list, run one, run all) and are four independent groups; then the orchestrator for US4 (compare across languages) and US5 (snapshots and drift); then integration and polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1 list, US2 run one, US3 run all, US4 compare across languages, US5 snapshots and drift
- Paths are relative to the repository root

## Path Conventions

Language-first monorepo (constitution I): `java/`, `python/`, `typescript/`, `javascript/`, `tools/runner/`. Exact files per project are in plan.md § Source Code.

---

## Phase 1: Setup

**Purpose**: dependencies and wiring that Phase 0 did not include

- [x] T001 Add `yaml` 2.9.0 to `tools/runner/package.json` dependencies and run `pnpm install` from the repo root (lockfile updated)
- [x] T002 [P] Create `tools/runner/bin/patterns.js` (`#!/usr/bin/env node`, imports `tsx` register then `../src/cli.ts`), executable bit set, and confirm `pnpm --filter @patterns/runner exec patterns` resolves
- [x] T003 [P] Add `tools/runner/tests/fixtures/` skeleton: `catalog.yaml` (four languages all running `node tests/fixtures/fake-runner.js <lang>`; patterns `fixture-alpha` strict and `fixture-beta` loose with implementations for all four; `fixture-gamma` with no implementations), `docs/patterns/fixture-alpha.md` and `fixture-beta.md` with a `## The example` fenced block, `README.md` with `<!-- catalogue:start -->`/`<!-- catalogue:end -->` markers, empty `snapshots/`
- [x] T004 [P] Create `tools/runner/tests/fixtures/fake-runner.js`: reads `behaviour.json` next to it (per language: ids → lines, `fail` ids, `drift` overrides, `missing` flag → exit 127 before anything), implements `list`, `run <id>`, `run --all` exactly per `contracts/language-cli.md`

---

## Phase 2: Foundational (runtime contracts in every language)

**Purpose**: the `Example`/`Output` contract and discovery each CLI is built on. Blocks all user stories.

- [x] T005 [P] Java: `java/src/main/java/com/penapereira/patterns/runtime/Example.java` (`String id(); void run(Output out);`) and `Output.java` (`void line(String text);`)
- [x] T006 [P] Java: `java/src/test/java/com/penapereira/patterns/runtime/BufferOutput.java` (collects lines), `FixtureAlphaExample.java` (id `fixture-alpha`, lines `Executing Fixture Alpha Pattern Implementation`, `  first`, `  second`), `FixtureBetaExample.java` (id `fixture-beta`, one line), `FixtureFailingExample.java` (id `fixture-failing`, throws `IllegalStateException("boom")` after writing one line); register the three in `java/src/test/resources/META-INF/services/com.penapereira.patterns.runtime.Example`
- [x] T007 Java: `ExamplesTest.java` (fails first) then `Examples.java`: `static SortedMap<String, Example> discover(ServiceLoader<Example>)` and `discover()` using the context class loader; duplicate id → `IllegalStateException("duplicate example id: <id>")`
- [x] T008 [P] Python: `python/src/patterns/runtime/__init__.py` and `contract.py` (`Example` and `Output` `Protocol`s, `BufferOutput` class, `ConsoleOutput(stream)`)
- [x] T009 [P] Python: `python/tests/fixtures/__init__.py`, `fixtures/fixture_alpha/__init__.py`, `fixtures/fixture_beta/__init__.py`, `fixtures/fixture_failing/__init__.py` (same ids and lines as the Java fixtures), `fixtures/not_an_example/__init__.py` (no `example` attribute)
- [x] T010 Python: `python/tests/test_discovery.py` (fails first) then `python/src/patterns/runtime/discovery.py`: `discover(package: ModuleType = patterns) -> dict[str, Example]` via `pkgutil.iter_modules(package.__path__)`, skipping `runtime`, importing each subpackage, reading `example` if present; duplicate → `DuplicateExampleError`
- [x] T011 [P] TypeScript: `typescript/src/runtime/contract.ts` (`Example`, `Output` interfaces, `BufferOutput`, `ConsoleOutput`), `typescript/src/runtime/registry.ts` (`export const examples: Example[] = []`), `typescript/src/runtime/fixtures.test-helper.ts` exporting `fixtureAlpha`, `fixtureBeta`, `fixtureFailing` (same ids and lines) — helper is test-only (excluded via `*.test-helper.ts` pattern added to `vitest.config.ts` coverage exclude and to the CLI production import graph)
- [x] T012 [P] JavaScript: `javascript/src/runtime/contract.js` (`BufferOutput`, `ConsoleOutput`, JSDoc for the Example shape), `javascript/src/runtime/registry.js` (`export const examples = []`), `javascript/src/runtime/fixtures.test-helper.js` (same fixtures); add the helper pattern to the c8 excludes in `javascript/scripts/run-tests.js`
- [x] T013 [P] TypeScript and JavaScript: `typescript/src/runtime/index-of.test.ts` and `javascript/src/runtime/index-of.test.js` (fail first) then `indexExamples(list)` in each `contract` module: sorted map by id, duplicate → `Error("duplicate example id: <id>")`

**Checkpoint**: each language can build a sorted, duplicate-free index of examples from fixtures; all five projects still lint green.

---

## Phase 3: Per-language CLIs — US1 list, US2 run one, US3 run all

**Goal**: in each language, `list`, `run <id>`, `run --all` exactly per `contracts/language-cli.md`; production build has no examples.

**Independent Test**: each language's test suite drives its CLI function with fixture examples and asserts stdout, stderr and exit code byte for byte; on the production build `list` prints `[]` and `run x` exits 2.

### Java — `java/src/main/java/com/penapereira/patterns/runtime/`

- [x] T014 [P] [US1] `java/src/test/java/com/penapereira/patterns/runtime/CliTest.java`: `list` with fixtures → `["fixture-alpha","fixture-beta","fixture-failing"]\n`, exit 0; `list` with empty map → `[]\n`
- [x] T015 [P] [US2] `CliTest.java`: `run fixture-alpha` → three lines with `\n`, empty stderr, exit 0; `run nope` → empty stdout, stderr `unknown example: nope\n`, exit 2; `run fixture-failing` → empty stdout, stderr `example failed: fixture-failing: boom\n`, exit 1
- [x] T016 [P] [US3] `CliTest.java`: `run --all` → alpha, 40 dashes, beta, 40 dashes, (failing: stderr line) exit 1; `run --all` with only alpha and beta → exit 0 with one separator; empty map → empty stdout exit 0; no args / `bogus` → usage line on stderr, exit 1
- [x] T017 [US1] `Cli.java`: `int run(String[] args, PrintStream out, PrintStream err, SortedMap<String, Example> examples)` implementing `list` (compact JSON, ids sorted; JSON-escape ids)
- [x] T018 [US2] `Cli.java`: `run <id>` — collect through `BufferOutput`-like private class, print all lines only on success; exit codes 0/2/1 and stderr messages per contract
- [x] T019 [US3] `Cli.java`: `run --all` with 40-dash separator between consecutive outputs, per-example failure to stderr, exit 1 if any failed; usage handling
- [x] T020 [US1] `Main.java`: `main` builds `Examples.discover()` (catching the duplicate exception → stderr line, exit 1), calls `Cli.run(args, System.out, System.err, ...)`, `System.exit`; add `**/runtime/Main.class` already excluded in `pom.xml`; `./mvnw -q verify` green, jar runs `list` → `[]`

### Python — `python/src/patterns/runtime/`

- [x] T021 [P] [US1] `python/tests/test_cli.py`: same `list` cases as T014 using `io.StringIO` streams and fixture dict
- [x] T022 [P] [US2] `python/tests/test_cli.py`: same `run` cases as T015
- [x] T023 [P] [US3] `python/tests/test_cli.py`: same `run --all` and usage cases as T016
- [x] T024 [US1] `python/src/patterns/runtime/cli.py`: `run(argv: Sequence[str], stdout: TextIO, stderr: TextIO, examples: Mapping[str, Example]) -> int` — `list` (json.dumps with `separators=(",", ":")`)
- [x] T025 [US2] `cli.py`: `run <id>` with buffered output, exit codes and messages per contract
- [x] T026 [US3] `cli.py`: `run --all`, separator, usage; `main() -> None` (excluded from coverage via `omit` already in `pyproject.toml`; move the entry into `cli.py:main` only, keep `run` covered) calling `discover()` and `sys.exit(run(sys.argv[1:], sys.stdout, sys.stderr, examples))`; `uv run --project python patterns list` → `[]`; pytest/ruff/mypy green

### TypeScript — `typescript/src/runtime/`

- [x] T027 [P] [US1] `typescript/src/runtime/cli.test.ts`: `list` cases as T014 with an `Io {stdout: string[]; stderr: string[]}` collector
- [x] T028 [P] [US2] `cli.test.ts`: `run` cases as T015
- [x] T029 [P] [US3] `cli.test.ts`: `run --all` and usage cases as T016
- [x] T030 [US1] `typescript/src/runtime/cli.ts`: `export function run(argv: readonly string[], io: Io, examples: readonly Example[]): number` — `list`
- [x] T031 [US2] `cli.ts`: `run <id>` buffered, codes and messages per contract
- [x] T032 [US3] `cli.ts`: `run --all`, separator, usage; `typescript/src/cli.ts` entry (`process.exit(run(process.argv.slice(2), consoleIo, examples))`, catching duplicate error → stderr, exit 1); `pnpm --dir typescript exec tsx src/cli.ts list` → `[]`; vitest coverage, tsc, eslint green

### JavaScript — `javascript/src/runtime/`

- [x] T033 [P] [US1] `javascript/src/runtime/cli.test.js` (node:test): `list` cases as T014
- [x] T034 [P] [US2] `cli.test.js`: `run` cases as T015
- [x] T035 [P] [US3] `cli.test.js`: `run --all` and usage cases as T016
- [x] T036 [US1] `javascript/src/runtime/cli.js`: `export function run(argv, io, examples)` — `list`
- [x] T037 [US2] `cli.js`: `run <id>` buffered, codes and messages per contract
- [x] T038 [US3] `cli.js`: `run --all`, separator, usage; `javascript/src/cli.js` entry; `node javascript/src/cli.js list` → `[]`; c8 gate and eslint green

**Checkpoint**: all four production CLIs answer `list` with `[]` and `run x` with exit 2; each language's tests cover the contract table completely.

---

## Phase 4: Orchestrator — US4 compare one pattern across languages (includes `list`)

**Goal**: `patterns list` and `patterns run` per `contracts/orchestrator.md`, tested against the fixture repository.

**Independent Test**: `tools/runner` tests copy `tests/fixtures/` to a temp dir and assert the rendered blocks, headers, `(not implemented)`, `(toolchain unavailable)`, not-in-catalog error and exit codes.

- [x] T039 [P] [US4] `tools/runner/src/catalog.test.ts` (fails first): loads fixture catalog; rejects unknown language key in implementations, duplicate ids, non-kebab id, `fixture-` prefix in a non-fixture context (flag `allowFixturePrefix` for tests), missing category; `findRoot()` walks up to `catalog.yaml`
- [x] T040 [US4] `tools/runner/src/catalog.ts`: `loadCatalog(path): Catalog` with `yaml.parse` and structural validation producing typed `Catalog`, `Language`, `Pattern` (fields and rules verbatim from data-model.md: `version === 1`; `parity` default `strict`; id regex `^[a-z][a-z0-9]*(-[a-z0-9]+)*$`); `findRoot(start = process.cwd())`
- [x] T041 [P] [US4] `tools/runner/src/languages.test.ts` (fails first): `listExamples(lang)` parses JSON; `runExample(lang, id)` maps exit 0/2/1 and spawn `ENOENT` to `RunResult.status` `ok` / `unknown-example` / `failed` / `toolchain-unavailable`; uses fake-runner behaviours
- [x] T042 [US4] `tools/runner/src/languages.ts`: `splitCommand(run)`, `spawnSync(cmd, args, {cwd: root, encoding: "utf8", timeout: 60_000, shell: false})`, `listExamples`, `runExample` → `RunResult {pattern, language, status, stdout, stderr, exitCode}`
- [x] T043 [P] [US4] `tools/runner/src/commands/list.test.ts` and `run.test.ts` (fail first): grouped list in catalog order, `--lang` filter, `--json`; `run fixture-alpha` renders `== <Language name> ==` blocks in catalog order; `fixture-gamma` → four `(not implemented)`, exit 0; id not in catalog → error, no spawn (fake-runner records invocations in a log file), exit 1; one language `missing` → `(toolchain unavailable)`, exit 1; one `fail` → `(failed, exit 1)` + stderr, exit 1; `run --all` iterates patterns with implementations with `## <id>` headings
- [x] T044 [US4] `tools/runner/src/commands/list.ts` and `tools/runner/src/commands/run.ts` implementing the above; `tools/runner/src/report.ts` with text and JSON renderers shared by all commands
- [x] T045 [US4] `tools/runner/src/cli.ts`: argv parsing for `list|run|snapshot|check|validate` with `--lang`, `--all`, `--json`, `--update`, `--write-readme`, `--pattern`; unknown → usage, exit 1; wire `list` and `run`; `make list` and `make run P=strategy` work on the real repo (four `(not implemented)` blocks)

**Checkpoint**: US4 demonstrable on the real repository and fully tested on fixtures.

---

## Phase 5: Orchestrator — US5 snapshots, check, validate, conformance CI

**Goal**: `snapshot`, `check`, `validate [--write-readme]` per contract; CI conformance job.

**Independent Test**: fixture tests record snapshots, induce drift/mismatch/missing toolchain, and assert exit codes and the pattern/language/line named; `validate` on the real repo exits 0 and README regeneration is a no-op.

- [x] T046 [P] [US5] `tools/runner/src/commands/snapshot.test.ts` (fails first): writes `snapshots/<id>/<lang>.txt` equal to stdout for every declared implementation; empty output → empty file; second run → `unchanged`; drifted language without `--update` → `skipped (use --update)` exit 1; with `--update` → `updated`; `--pattern`/`--lang` filters; failed run → not written, exit 1
- [x] T047 [US5] `tools/runner/src/snapshots.ts` (`snapshotPath`, `readSnapshot`, `writeSnapshot`) and `tools/runner/src/commands/snapshot.ts`
- [x] T048 [P] [US5] `tools/runner/src/commands/check.test.ts` (fails first): all match → `check: N ok, 0 drift, 0 mismatch, 0 failed`, exit 0; drift → exit 1 naming pattern, language, first differing line number and both lines; missing snapshot → fail; strict mismatch (two languages differ, both matching their own snapshots) → fail naming languages; loose mismatch → info, exit 0; toolchain missing → fail; `--json` shape
- [x] T049 [US5] `tools/runner/src/compare.ts` (`firstDifference(a, b)`, `compareAcross(results)`) and `tools/runner/src/commands/check.ts`
- [x] T050 [P] [US5] `tools/runner/src/readme.test.ts` (fails first): renders one table per category in catalog order with the column layout of the Phase 0 README (`| | Pattern | Intent | Java | Python | TypeScript | JavaScript |`; concurrency category uses `Construct`/`Problem` headers); `done` when implementation declared and snapshot exists, else `pending`; `splice(readme, section)` replaces only between markers; rendering the real `catalog.yaml` reproduces the committed README section exactly
- [x] T051 [US5] `tools/runner/src/readme.ts`
- [x] T052 [P] [US5] `tools/runner/src/commands/validate.test.ts` (fails first): findings for missing doc, missing implementation path, `list` not containing a declared id, extra id reported by a language, missing snapshot for declared implementation, doc `## The example` block ≠ reference snapshot, stale README (exit 1) then `--write-readme` fixes (exit 0 and file changed), non-ASCII output → warning only; on the real repo → exit 0
- [x] T053 [US5] `tools/runner/src/commands/validate.ts` (uses catalog, languages, snapshots, readme; doc block extraction per research R11); wire `snapshot`, `check`, `validate` into `src/cli.ts`
- [x] T054 [US5] `.github/workflows/conformance.yml`: on push to `master` and pull requests; checkout@v7.0.1, setup-java@v6.0.1 (25, temurin, cache maven), astral-sh/setup-uv@v10.0.1, pnpm/action-setup@v6.1.0, setup-node@v7.0.0 (22, cache pnpm); `make setup`, `make validate`, `make check`

**Checkpoint**: `make validate` and `make check` exit 0 on the real repository; orchestrator coverage gate satisfied.

---

## Phase 6: Integration & Polish

- [ ] T055 [P] Verify `Makefile` `RUNNER` invocation works from a clean shell (`make list`, `make run P=strategy L=java`, `make run-all L=python`, `make snapshot`, `make check`, `make validate`); fix the pnpm filter/exec form if needed
- [ ] T056 [P] Update `tools/runner/README.md` (commands now real, fixture testing approach), `java/README.md`, `python/README.md`, `typescript/README.md`, `javascript/README.md` (exact `list`/`run` commands and exit codes), root `README.md` "How it fits together" if anything changed
- [ ] T057 [P] `PLAN.md`: mark Phase 1 spec 001 as delivered; confirm `catalog.yaml` `run:` commands match what the orchestrator executes
- [ ] T058 Run the full `quickstart.md` script end to end on this machine; record the outcome in `specs/001-cli-runner/quickstart.md` under a "Validated" note with date
- [ ] T059 `make lint && make test` green for all five projects; coverage > 90 % line and branch confirmed in each report; commit on `001-cli-runner`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: none. T002–T004 parallel after T001.
- **Foundational (Phase 2)**: after Setup. The four language groups (T005–T007, T008–T010, T011, T012–T013) are independent of each other.
- **Per-language CLIs (Phase 3)**: each language group depends only on its own Foundational group. Java T014–T020, Python T021–T026, TypeScript T027–T032, JavaScript T033–T038 can proceed in parallel; within a group tests (parallel) precede implementation (sequential: list → run → run --all → entry).
- **Orchestrator US4 (Phase 4)**: depends on Setup fixtures (T003, T004) only; can proceed in parallel with Phase 3. T045 (`make run` on the real repo) additionally needs Phase 3 complete.
- **Orchestrator US5 (Phase 5)**: depends on Phase 4 (catalog, languages, cli). T046/T048/T050/T052 tests are parallel; T054 independent.
- **Polish (Phase 6)**: after everything.

### User Story Dependencies

- US1, US2, US3 are delivered together per language by one CLI module; US1 (list) is the minimal increment, US2 adds `run <id>`, US3 adds `run --all`.
- US4 needs at least one language CLI to demonstrate on the real repo but is fully testable on fixtures alone.
- US5 builds on US4's catalog and process layer.

### Parallel Opportunities

- Four language groups in Phases 2–3 (different directories, zero shared code).
- Orchestrator Phase 4 alongside Phase 3.
- All `*.test.*` tasks within a phase.

---

## Parallel Example: Phase 3

```bash
# Four independent streams:
Stream A: T014 T015 T016 → T017 → T018 → T019 → T020   (java/)
Stream B: T021 T022 T023 → T024 → T025 → T026          (python/)
Stream C: T027 T028 T029 → T030 → T031 → T032          (typescript/)
Stream D: T033 T034 T035 → T036 → T037 → T038          (javascript/)
# Meanwhile:
Stream E: T039 → T040, T041 → T042, T043 → T044 → T045 (tools/runner/)
```

---

## Implementation Strategy

### MVP First (US1 in one language)

1. Phase 1, Phase 2 Java group, T014, T017, T020: `java -jar java/target/patterns.jar list` prints `[]` and the fixture test prints the three ids. Validates the contract shape before replicating it.

### Incremental Delivery

1. Complete Java through T020, then replicate to Python, TypeScript, JavaScript (Phase 3 streams).
2. Orchestrator US4 → `make run P=strategy` shows four `(not implemented)` blocks.
3. Orchestrator US5 → `make validate` and `make check` green; conformance workflow added.
4. Polish and quickstart validation.

---

## Notes

- Fixture ids are `fixture-alpha`, `fixture-beta`, `fixture-failing`; fixture lines are identical across the four languages so later cross-language tests can reuse them.
- Only entry files are excluded from coverage: `Main.java`, `cli.py:main`, `typescript/src/cli.ts`, `javascript/src/cli.js`, `tools/runner/bin/patterns.js`, `tools/runner/src/cli.ts`. Everything they call is tested.
- Commit after each phase checkpoint on branch `001-cli-runner`.
