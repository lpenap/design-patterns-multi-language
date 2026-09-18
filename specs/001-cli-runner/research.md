# Research: CLI Runner

Decisions that the spec left to design. No external unknowns remained; each
item records the choice, the reason and what was rejected.

## R1. Java discovery and packaging

- **Decision**: `ServiceLoader<Example>` with registrations in
  `META-INF/services/com.penapereira.patterns.runtime.Example`; fixtures
  registered in `src/test/resources/META-INF/services/...`, which is on the
  test class path only. Package as a plain executable jar (`maven-jar-plugin`
  with `mainClass`), no dependencies, so `java -jar java/target/patterns.jar`
  works with no shading.
- **Rationale**: standard library, zero dependencies, test-only registration
  falls out of the class path naturally. Satisfies FR-002 and FR-020.
- **Alternatives**: classpath scanning libraries (dependency, framework smell);
  module `provides` clauses (would force JPMS on every pattern package).

## R2. Python discovery

- **Decision**: `pkgutil.iter_modules(patterns.__path__)`, import each
  subpackage except `runtime`, read its `example` attribute if present.
  `discovery.discover(package=patterns)` takes the package as a parameter so
  tests pass a fixture package (`tests/fixtures`) instead of the real one.
- **Rationale**: no registry to maintain, mirrors "one package per pattern";
  parameterising the root package keeps fixtures out of production.
- **Alternatives**: entry points in `pyproject.toml` (a hand-maintained list,
  violates FR-002 spirit); importlib.metadata (needs installation of every pattern).

## R3. TypeScript and JavaScript discovery

- **Decision**: a `registry` module exporting an array that pattern folders are
  appended to by an explicit import line. The CLI function receives the array
  as a parameter; production entry passes the real registry, tests pass fixture
  arrays.
- **Rationale**: ESM has no class-path scanning; a registry is the idiomatic
  explicit alternative and is what the constitution names. Dynamic `fs`-based
  globbing of `src/*/index.ts` was rejected because it makes bundling and type
  checking opaque and hides the dependency graph.

## R4. Testable CLIs with excluded entry points

- **Decision**: every language splits `cli` (pure function:
  `run(argv, stdout, stderr, examples) -> exit code`) from the process entry
  (`Main.java`, `cli.py:main`, `src/cli.ts`, `src/cli.js`) that only wires
  `process.argv`/`System.out`/`sys.exit`. Only the entry file is excluded from
  coverage.
- **Rationale**: constitution VI allows excluding argument parsing and `main`
  only; keeping the excluded file free of branches means the exclusion hides
  nothing.

## R5. Exit codes and streams

- **Decision**: 0 success; 2 unknown identifier (`list` never returns 2); 1 any
  other failure (example threw, duplicate id at start-up, bad usage). Errors go
  to stderr as one line; stdout carries only example output (plus `[]`/JSON for
  `list`). Bad usage prints a one-line usage hint and exits 1.
- **Rationale**: matches spec FR-005; the orchestrator can distinguish "not
  implemented here" from "broken".

## R6. Output framing

- **Decision**: every line is written with a trailing `\n`; `run --all` prints
  a separator of 40 dashes on its own line between examples, never before the
  first or after the last. Snapshot file content is exactly the stdout of
  `run <id>`; an example with no lines gives an empty file.
- **Rationale**: byte-exact comparison (constitution III) needs a fixed rule;
  40 dashes is the width of the original project's separator.

## R7. Orchestrator process invocation

- **Decision**: parse the catalog `run:` string by whitespace (no quoting
  support) into argv, `spawnSync` with `cwd` = repository root, `encoding:
  utf8`, `stdio: pipe`, a 60 s timeout, and `shell: false`. Result captured as
  `RunResult{status, stdout, stderr, error}`. A spawn error (`ENOENT`) becomes
  `toolchain unavailable`.
- **Rationale**: deterministic, no shell quoting surprises, cross-platform
  enough for macOS/Linux; the four real commands have no arguments needing
  quotes. Repository root is found by walking up from `process.cwd()` until
  `catalog.yaml` is found, so `make` and direct invocation both work.
- **Alternatives**: `execa` (dependency for nothing we need); `shell: true`
  (platform-dependent quoting).

## R8. Orchestrator testing without toolchains

- **Decision**: `tools/runner/tests/fixtures/` holds a mini repository: a
  `catalog.yaml` whose four languages all run `node tests/fixtures/fake-runner.js
  <lang>`, a `docs/patterns/fixture-alpha.md`, `snapshots/`, and a `README.md`
  with markers. The fake runner reads a JSON behaviour file (`fixtures/
  behaviour.json`) so tests can make one language drift, fail, or be missing
  without touching real toolchains. Tests copy the fixture tree to a temp dir
  per test.
- **Rationale**: the orchestrator's own suite must run in the `node` CI job
  without Java or Python installed and must be able to simulate every edge
  case in the spec.

## R9. Catalog parsing and validation

- **Decision**: `yaml` 2.9.0 (`parse`) plus a hand-written structural check
  (`catalog.ts`) producing typed `Catalog`; errors name the offending key. No
  schema library.
- **Rationale**: the shape is small and fixed; a JSON-schema dependency would
  outweigh it. `yaml` published 2026-05-11, compliant with the seven-day rule.

## R10. README generation

- **Decision**: `readme.ts` renders one table per category in catalog order
  with columns icon, name (linked to doc), intent, and one status column per
  language (`done` when an implementation path is declared and its snapshot
  exists, `pending` otherwise). It splices between `<!-- catalogue:start -->`
  and `<!-- catalogue:end -->`. `validate` compares rendered vs. current and
  fails when different unless `--write-readme`.
- **Rationale**: FR-015; matches the hand-written Phase 0 table so the first
  run is a no-op.

## R11. Documentation ↔ snapshot check

- **Decision**: `validate` looks in each existing pattern doc for the first
  fenced code block following a heading that starts with `## The example` and
  compares its content with the reference snapshot (first language in catalog
  order with a declared implementation). Missing doc or missing block is
  reported; on the current catalog (no docs, no implementations) the check has
  nothing to compare and passes.
- **Rationale**: FR-015 and constitution V; a simple, explicit convention that
  spec 002 will be the first to exercise.

## R12. Conformance workflow

- **Decision**: `.github/workflows/conformance.yml` on push to `master` and
  pull requests, one job: checkout, setup Java 25, uv, pnpm + Node 22,
  `make setup`, `make validate`, `make check`. No path filter (it is the
  cross-cutting gate).
- **Rationale**: FR-019; `make setup` builds the jar the Java `run:` command
  needs.
