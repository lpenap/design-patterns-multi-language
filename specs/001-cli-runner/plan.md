# Implementation Plan: CLI Runner

**Branch**: `001-cli-runner` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-cli-runner/spec.md`

## Summary

Deliver the host that every pattern will plug into: in each of the four
languages a tiny runtime (`Example`, `Output`, discovery) and a CLI honouring
the shared protocol (`list`, `run <id>`, `run --all`), plus a TypeScript
orchestrator at `tools/runner` that reads `catalog.yaml`, drives the four CLIs
as subprocesses and implements `validate`, `list`, `run`, `snapshot` and
`check`. No pattern ships. Each language proves its CLI against fixture
examples that exist only in its test tree; the orchestrator proves itself
against a fixture catalog whose `run:` commands point at a fake runner script.
A conformance workflow runs `validate` and `check` in CI.

## Technical Context

**Language/Version**: Java 25 (Maven 3.9.16 via wrapper); Python 3.12+ (3.14 pinned locally, uv); TypeScript 6.0.3 on Node 20.19+ (tsx 4.23.13); JavaScript ES2022 modules on Node 20.19+.

**Primary Dependencies**: none at runtime in the four languages (standard libraries only, constitution IV). Orchestrator: `yaml` 2.9.0 for catalog parsing; Node built-ins for everything else. Test: JUnit 6.1.3, pytest 9.1.1, vitest 5.0.0, `node:test` + c8 12.

**Storage**: files only — `catalog.yaml` (read), `snapshots/<id>/<lang>.txt` (read/write), `README.md` catalogue section (read/write).

**Testing**: per-language unit tests with in-memory `Output`; CLI tests invoke the CLI function with injected streams and fixture registries; orchestrator tests run against `tests/fixtures/` (catalog + fake runner) in a temp copy of a mini repository.

**Target Platform**: macOS and Linux developer machines, GitHub Actions `ubuntu-latest`.

**Project Type**: multi-language CLI tooling in a monorepo (five projects).

**Performance Goals**: `run <id>` under one second per language excluding JVM start; `make check` on the full future catalogue under two minutes on a laptop (SC-007).

**Constraints**: byte-exact output comparison; exit codes 0/1/2 fixed by the spec; no framework; CLI entry points the only coverage exclusions; nothing shared across language directories.

**Scale/Scope**: 4 language runtimes (~100 lines each incl. CLI), 1 orchestrator (~600 lines), 28 catalogued patterns eventually, fixture-only acceptance now.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. One catalog, language-first | Orchestrator reads only `catalog.yaml`; no code shared between `java/`, `python/`, `typescript/`, `javascript/`; README table generated | PASS |
| II. Example contract | Each language: `Example{id, run(out)}`, `Output{line}`, discovery by ServiceLoader / package import / registry; CLI `list`/`run <id>`/`run --all`; exit 2 on unknown id | PASS |
| III. Output conventions & parity | Host adds nothing but the `run --all` separator; orchestrator compares byte for byte; strict/loose per catalog | PASS |
| IV. Idiomatic, literature names, no frameworks | Runtime uses standard libraries only; TS and JS runtimes written independently | PASS |
| V. Documentation | No pattern doc in scope; `validate` implements the doc↔snapshot check for later specs | PASS (n/a for content) |
| VI. Quality gates | Tests per language incl. exact-lines assertions; > 90 % line and branch; only `Main`/`cli` entry excluded; `validate` and `check` green on the committed repo | PASS (design keeps entry points thin so the excluded code is argument plumbing only) |
| Toolchain constraints | Versions as in Phase 0; `yaml` 2.9.0 published 2026-05-11 (≥ 7 days) | PASS |
| Workflow | Spec 001 from default template, on branch `001-cli-runner`, fixtures with `fixture-` prefix | PASS |

No violations; Complexity Tracking not needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-cli-runner/
├── plan.md              # this file
├── research.md          # decisions behind the design
├── data-model.md        # Catalog, Example, Output, Snapshot, RunResult
├── quickstart.md        # how to validate the feature end to end
├── contracts/
│   ├── language-cli.md  # the protocol every language CLI honours
│   └── orchestrator.md  # `patterns` command contract
└── tasks.md             # /speckit-tasks output
```

### Source Code (repository root)

```text
java/src/main/java/com/penapereira/patterns/runtime/
├── Example.java             interface: String id(); void run(Output out)
├── Output.java              interface: void line(String text)
├── Examples.java            discovery: ServiceLoader<Example> → sorted map, duplicate check
├── Cli.java                 int run(String[] args, PrintStream out, PrintStream err, Map<String,Example>)
└── Main.java                public static void main → System.exit(new Cli().run(...))   [excluded from coverage]
java/src/test/java/com/penapereira/patterns/runtime/
├── BufferOutput.java        in-memory Output for tests
├── FixtureAlphaExample.java  id "fixture-alpha"
├── FixtureBetaExample.java   id "fixture-beta"
├── ExamplesTest.java  CliTest.java
java/src/test/resources/META-INF/services/com.penapereira.patterns.runtime.Example   (fixtures)

python/src/patterns/runtime/
├── __init__.py
├── contract.py              Example, Output protocols; BufferOutput
├── discovery.py             iterate subpackages of `patterns`, collect `example`, duplicate check
└── cli.py                   run(argv, stdout, stderr, examples) -> int ; main() entry   [main excluded]
python/tests/
├── fixtures/fixture_alpha/__init__.py, fixture_beta/__init__.py   (namespace used by tests)
├── test_contract.py  test_discovery.py  test_cli.py

typescript/src/runtime/
├── contract.ts              Example, Output interfaces; BufferOutput
├── registry.ts              export const examples: Example[] = []   (patterns append here)
├── cli.ts                   run(argv, io, examples): number
├── *.test.ts                fixtures inline in tests (fixture-alpha, fixture-beta)
typescript/src/cli.ts        entry: process.exit(run(process.argv.slice(2), io, examples))   [excluded]

javascript/src/runtime/      same shape in ESM JS: contract.js, registry.js, cli.js, *.test.js
javascript/src/cli.js        entry   [excluded]

tools/runner/
├── bin/patterns.js          #!/usr/bin/env node → tsx import of src/cli.ts   [excluded]
├── src/cli.ts               argument parsing → commands                       [excluded]
├── src/catalog.ts           load + schema-validate catalog.yaml
├── src/languages.ts         spawn a language CLI: list(lang), run(lang, id) → RunResult
├── src/commands/{validate,list,run,snapshot,check}.ts
├── src/readme.ts            render catalogue section; splice between markers
├── src/report.ts            human-readable and JSON reporting
├── src/*.test.ts
└── tests/fixtures/          catalog.yaml, fake-runner.js, docs/, snapshots/, README.md

.github/workflows/conformance.yml
Makefile                     (targets already present; RUNNER path verified)
```

**Structure Decision**: language-first as fixed by the constitution; each
runtime is a single `runtime` package with four small files so that the pattern
folders added by later specs sit beside it. The orchestrator is one package with
one module per command, tested against fixtures so its suite never needs the
four toolchains.

## Phase 0 and Phase 1 outputs

See [research.md](research.md), [data-model.md](data-model.md),
[contracts/language-cli.md](contracts/language-cli.md),
[contracts/orchestrator.md](contracts/orchestrator.md) and
[quickstart.md](quickstart.md).

## Post-design Constitution Check

Re-evaluated after Phase 1: unchanged, all PASS. The only code excluded from
coverage is `Main.java`, `python/src/patterns/runtime/cli.py:main`,
`typescript/src/cli.ts`, `javascript/src/cli.js`, `tools/runner/bin/patterns.js`
and `tools/runner/src/cli.ts`; each is process wiring (argv, streams, exit) with
no branching logic, and the argument parsing they call lives in tested modules.
