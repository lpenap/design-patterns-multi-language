# Quickstart: validating the CLI Runner

Prerequisites: `sdk env` (JDK 25), `uv`, Node 20.19+, `corepack enable`.

```bash
make setup                       # pnpm install, uv sync, builds java/target/patterns.jar
make lint && make test           # five projects green, coverage gates satisfied
```

## Per-language protocol on the empty production build

```bash
java -jar java/target/patterns.jar list            # []
uv run --project python patterns list              # []
pnpm --dir typescript exec tsx src/cli.ts list     # []
node javascript/src/cli.js list                    # []
java -jar java/target/patterns.jar run nope; echo $?    # stderr "unknown example: nope", 2
```

## Fixture-based behaviour (in the test suites)

Each language's tests register `fixture-alpha` and `fixture-beta` and assert:
`list` → `["fixture-alpha","fixture-beta"]`; `run fixture-alpha` prints its
lines exactly with the `Executing ... Pattern Implementation` heading and two-
space indent; `run --all` prints both separated by 40 dashes; unknown id → exit
2; a throwing fixture → exit 1 with clean stdout.

## Orchestrator on the real repository

```bash
make validate     # catalog ok, 28 patterns pending, README section up to date → exit 0
make list         # four languages, each []
make run P=strategy          # four "(not implemented)" blocks, exit 0
make run P=does-not-exist    # "not in catalog", exit 1
make check        # nothing declared → "check: 0 ok ..." exit 0
```

## Orchestrator drift detection (in its test suite)

`tools/runner` tests copy `tests/fixtures/` to a temp dir and drive the fake
runner: record snapshots, then make one language drift → `check` exits 1 and
names `fixture-alpha`, the language and line 2; make the pattern `loose` →
cross-language difference is reported as info only; remove a language command
→ `toolchain unavailable`, exit 1; stale README → `validate` exit 1, then
`--write-readme` fixes it.

## CI

Push the branch: `java`, `python`, `node` and `conformance` workflows green.

## Validated

2026-09-18, macOS, JDK 25.0.4-tem, Python 3.14.6, Node 20.20.2, pnpm 12.4.0:
every command above behaved as described. `make validate` reports
`validate: 27 patterns, 0 errors`; `make check` reports
`check: 0 ok, 0 drift, 0 mismatch, 0 failed`; `make run P=does-not-exist`
prints `not in catalog: does-not-exist` and exits 1. Coverage: Java 100/100,
Python 100/100, TypeScript 100/100, JavaScript 100/100, orchestrator 99/94
(lines/branches, %). CI workflows cannot run until a remote exists.
