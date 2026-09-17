# Design Patterns, Multi-Language — Constitution

The rules every specification, plan and implementation in this repository must
obey. `PLAN.md` explains the reasoning and the phases; this document is the
binding summary. When the two disagree, this document wins and `PLAN.md` is
corrected.

## Core Principles

### I. One catalog, language-first code, pattern-first docs
`catalog.yaml` at the repository root is the single source of truth for the
patterns, the languages and where each implementation lives. Code is organised
by language (`java/`, `python/`, `typescript/`, `javascript/`), each directory a
standalone, idiomatic project. Documentation is organised by pattern
(`docs/patterns/<id>.md`). Nothing in one language directory may depend on, import
from or share code with another. Every cross-cutting artefact (README catalogue
table, CI matrix, conformance checks) is generated from or validated against the
catalog, never maintained by hand.

### II. The example contract (NON-NEGOTIABLE)
Every pattern in every language exposes an *Example* with an `id` equal to the
catalog id and a `run(out)` operation that writes only through the injected
*Output* sink (`out.line(text)`), never to stdout directly. Examples are
discovered, not registered by hand in the host: Java through `ServiceLoader`
(`META-INF/services`), Python by importing each package under `patterns/` and
reading its `example`, TypeScript and JavaScript through a `registry` module.
Each language ships a CLI honouring the shared protocol: `list` prints a JSON
array of ids; `run <id>` prints the example's lines and exits 0; an unknown id
exits 2 with a one-line message on stderr; `run --all` runs every example
separated by a line of dashes.

### III. Output conventions and cross-language parity
Output is plain ASCII. The first line is `Executing <Name> Pattern
Implementation`; every further line is indented two spaces. A run produces a
handful of lines and finishes in under a second. Output is deterministic and
byte-identical across the four languages, so `snapshots/<id>/<language>.txt` can
be diffed. A pattern whose nature prevents identical output (threads) is marked
`parity: loose` in the catalog and explains why in its doc; `loose` is the
exception and requires a reason.

### IV. Idiomatic implementations named after the literature
Each implementation uses the fewest classes or functions that still show the
pattern's structure, written the way a fluent developer of that language would
write it. Participant names follow the reference literature (`Context`,
`ConcreteStrategyA`, `Handler`, `Subject`) in every language so the participants
table of the doc maps onto each of them. TypeScript and JavaScript are two
independent implementations, not one compiled from the other. No frameworks in
the host or in the examples.

### V. Documentation is academic and language-neutral
`docs/patterns/<id>.md` follows the fixed outline: Intent, Motivation,
Structure, Participants, The example, Consequences, Language notes, Related
patterns, References. The Structure section is a Mermaid class diagram that
shows **only the pattern's participants**: never the Example, the Output sink,
registries, `ServiceLoader` or the CLI; the client role, when relevant, is a
generic `Client`. The Participants table maps every role to the class or
function in each language. The expected output block equals the committed
snapshot. References are numbered and resolve to `docs/references.md`. Anything
specific to one language belongs under Language notes.

### VI. Quality gates (NON-NEGOTIABLE)
Every pattern has, per language, tests of the pattern's behaviour and a test
asserting the example's exact output lines. Each language project enforces
**line (instruction) coverage above 90 % and branch coverage above 90 %** in its
build; only the CLI entry point (argument parsing and `main`) may be excluded.
Lint and type checks are clean (`-Xlint:all -Werror`; ruff and mypy `--strict`;
tsc strict and eslint; eslint). `patterns validate` and `patterns check` pass.
Nothing merges into `master` with a red check.

## Toolchain and Repository Constraints

* Java 25 LTS through SDKMAN (`.sdkmanrc`: `java=25.0.4-tem`), Maven wrapper,
  JUnit 5, JaCoCo. No Spring, Lombok or Swing.
* Python 3.12+ managed by uv (`pyproject.toml`, `src/` layout), pytest, coverage,
  ruff, mypy.
* TypeScript strict, `tsx` for execution, vitest with v8 coverage.
* JavaScript as plain ESM Node with no build step, `node:test`, c8.
* pnpm workspaces for `typescript/`, `javascript/` and `tools/runner`; pnpm
  pinned through `packageManager` in the root `package.json`.
* The orchestrator in `tools/runner` is TypeScript and speaks only the CLI
  protocol of Principle II; it has no knowledge of any language's internals.
* GitHub Actions is the only CI. Default branch `master`. No web site, static or
  served; documentation is markdown read on GitHub.
* External dependencies are pinned to versions published at least seven days
  before they are added.
* Catalog ids are kebab-case; implementation folder names follow each language's
  convention (`chainofresponsibility` for Java and Python,
  `chain-of-responsibility` for TypeScript and JavaScript).

## Development Workflow

* Work follows GitHub Spec Kit: one numbered feature under `specs/NNN-<slug>/`
  on its own branch, `specify → plan → tasks → implement`, merged into `master`
  when its acceptance criteria hold.
* Spec 001 is the CLI runner, accepted against fixture examples in each
  language's test tree. Spec 002 (Strategy) and every later pattern spec is
  created from `.specify/templates/pattern-spec-template.md` and its tasks from
  `.specify/templates/pattern-tasks-template.md`, not from the default
  templates. The default templates serve non-pattern features (host, tooling,
  new languages).
* A pattern is done only when every item of the definition of done in
  `PLAN.md §7.4` holds: documentation, four implementations, tests and coverage,
  catalog entry, snapshots, `validate` and `check` green, README table
  regenerated.
* Adding a language is a feature whose acceptance is "every catalogued pattern
  runs and passes `patterns check`" and whose only touch points are a new
  top-level directory, a CLI honouring Principle II and one entry under
  `languages:` in the catalog.

## Governance

This constitution supersedes any other practice in the repository. Amendments
are made by editing this file in a commit that states the reason, bumps the
version (MAJOR for a changed or removed principle, MINOR for an added rule or
section, PATCH for wording) and updates `PLAN.md §10` when a decision changes.
Every plan and every review checks compliance against the principles above;
deviations must be justified in the spec's Assumptions section and approved
before implementation.

**Version**: 1.0.0 | **Ratified**: 2026-09-17 | **Last Amended**: 2026-09-17
