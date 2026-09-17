# Feature Specification: CLI Runner

**Feature Branch**: `001-cli-runner`

**Created**: 2026-09-17

**Status**: Draft

**Input**: User description: "CLI runner: the host that lists and runs design pattern examples in each language, and the orchestrator that drives the four language CLIs. Scope is PLAN.md §7.5 'Spec 001 – CLI runner'. No pattern is part of this spec; acceptance runs against fixture examples in each language's test tree."

## Context

The repository will hold the same catalogue of design patterns implemented in
four languages. Before any pattern can be added, a learner needs one uniform
way to discover and run examples in whichever language they know, and a
maintainer needs one way to prove that the four implementations of a pattern
still agree with each other and with the documentation. This feature delivers
that host: a small command in each language that speaks a shared protocol, and
an orchestrator at the repository root that drives the four of them from the
catalog. It ships **no pattern**. Every behaviour below is accepted against
fixture examples that live only in each language's test suite, and against the
empty production catalog.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - List the examples a language offers (Priority: P1)

A learner who knows one language wants to see which pattern examples exist in
it before running anything.

**Why this priority**: Discovery is the entry point to every other story; without
it the learner has to read source trees.

**Independent Test**: From the repository root, ask one language for its list
and receive a machine-readable list of example identifiers, empty when the
language has no examples.

**Acceptance Scenarios**:

1. **Given** a language whose test suite registers one fixture example, **When** the learner asks that language to list its examples, **Then** the result is a machine-readable list containing exactly that example's identifier.
2. **Given** the production build of any language with no patterns yet, **When** the learner asks it to list its examples, **Then** the result is an empty list and the command succeeds.
3. **Given** the orchestrator, **When** the learner asks for the list of one language by name, **Then** the same list is shown, and asking without a language shows every language's list grouped by language.

---

### User Story 2 - Run one example in one language and read its output (Priority: P1)

A learner runs a single example in the language they know and reads its
output, formatted the same way every example is formatted.

**Why this priority**: Running an example is the core value of the repository.

**Independent Test**: Ask one language to run the fixture example and see its
lines, in order, with the shared heading and indentation conventions.

**Acceptance Scenarios**:

1. **Given** a language with the fixture example registered, **When** the learner runs it by identifier, **Then** its lines appear exactly as the example produced them, nothing else is printed to standard output, and the command succeeds.
2. **Given** any language, **When** the learner runs an identifier that does not exist, **Then** standard output stays empty, a single-line message naming the unknown identifier appears on the error stream, and the command fails with the exit status reserved for "unknown example".
3. **Given** the fixture example, **When** its output is inspected, **Then** the first line reads `Executing <Name> Pattern Implementation` and every following line starts with two spaces.

---

### User Story 3 - Run every example of one language (Priority: P2)

A learner wants to see all examples of a language in one go.

**Why this priority**: Convenient for a tour of the language, but built from
Story 2.

**Independent Test**: Ask one language to run all its examples and see each
one's output, visibly separated.

**Acceptance Scenarios**:

1. **Given** a language with two fixture examples registered, **When** the learner runs all, **Then** both outputs appear in identifier order, separated by a line of dashes, and the command succeeds.
2. **Given** a language with no examples, **When** the learner runs all, **Then** nothing is printed and the command succeeds.

---

### User Story 4 - Compare one pattern across all languages (Priority: P2)

A learner runs the same example in every language from the repository root
and compares the outputs side by side.

**Why this priority**: The cross-language comparison is what distinguishes this
repository from a single-language collection.

**Independent Test**: From the repository root, run one identifier without
naming a language and see one clearly labelled block per language.

**Acceptance Scenarios**:

1. **Given** the orchestrator and an identifier present in the catalog, **When** the learner runs it without naming a language, **Then** one block per language appears, each headed by the language name, in the order the catalog lists the languages.
2. **Given** an identifier the catalog does not list, **When** the learner runs it, **Then** the orchestrator reports the identifier is not in the catalog and fails, without invoking any language.
3. **Given** a catalog entry that names implementations for only some languages, **When** the learner runs it across languages, **Then** the languages without an implementation are shown as "not implemented" rather than as errors.

---

### User Story 5 - Record outputs and detect drift (Priority: P1)

A maintainer records every example's output per language as a snapshot in the
repository, and continuous integration reports when an implementation drifts
from its recorded output or when two languages disagree.

**Why this priority**: This is the mechanism that keeps the documentation
truthful and the four implementations equivalent; every later pattern depends
on it.

**Independent Test**: Record snapshots for a fixture catalog, alter one
language's output, and see the check fail naming the pattern, the language and
the differing lines.

**Acceptance Scenarios**:

1. **Given** a catalog with implementations, **When** the maintainer records snapshots, **Then** one file per pattern and language is written under the snapshots directory containing exactly the output of that run, and existing files are not overwritten unless the maintainer asks to update.
2. **Given** recorded snapshots that match current outputs, **When** the check runs, **Then** it reports success and exits successfully.
3. **Given** one language whose output no longer matches its snapshot, **When** the check runs, **Then** it fails and names the pattern, the language and the first differing line.
4. **Given** a pattern marked strict whose languages produce different outputs, **When** the check runs, **Then** it fails and names the pattern and the disagreeing languages; **Given** the same pattern marked loose, **Then** cross-language differences are reported as information and do not fail the check, while per-language snapshot drift still does.
5. **Given** the catalog, **When** validation runs, **Then** it fails on any of: a pattern whose documentation file is missing, an implementation path that does not exist, a snapshot missing for a declared implementation, a language whose list does not include an identifier the catalog declares for it, a documentation file whose expected-output block differs from the snapshot; and it succeeds on the current empty-implementation catalog.
6. **Given** validation with the write-README option, **When** it runs, **Then** the catalogue section of the root README between its two marker comments is regenerated from the catalog and nothing outside the markers changes.
7. **Given** a push or pull request, **When** continuous integration runs, **Then** a conformance job executes validation and the check across all four languages and fails the build on any failure.

### Edge Cases

- An example writes no lines at all: `run` prints nothing and still succeeds; the snapshot is an empty file.
- An example throws or exits abnormally: the language command fails with a non-zero status distinct from "unknown example", the orchestrator reports the failure for that language and continues with the others, and the check fails.
- Two examples in one language register the same identifier: the language command fails at start-up with a message naming the duplicate; validation reports it.
- The orchestrator runs on a machine missing one language's toolchain: the command for that language fails to start; the orchestrator reports "toolchain unavailable" for that language, and `check` fails, because a partial check is not a check.
- Output containing non-ASCII characters: accepted by the tooling, but flagged by validation as a convention violation.
- Trailing whitespace and final newline: the snapshot comparison is exact; the tooling normalises nothing, so implementations must agree byte for byte.
- `run --all` in a language where one example fails: remaining examples still run, and the command exits with the failure status.

## Requirements *(mandatory)*

### Functional Requirements

**Shared contract**

- **FR-001**: Each language MUST define an Example concept with an identifier and a run operation that receives an Output sink and writes every line through it; examples MUST NOT write to standard output directly.
- **FR-002**: Each language MUST discover its examples through that language's idiomatic mechanism (constitution Principle II) without a hand-maintained list in the host: Java through the platform's service-provider mechanism, Python by importing every pattern package and reading its `example`, TypeScript and JavaScript through a single registry module that pattern folders are added to.
- **FR-003**: Each language MUST provide a command-line entry point supporting exactly: `list`, `run <id>`, `run --all`.
- **FR-004**: `list` MUST print a JSON array of identifiers, sorted, and exit 0. An empty set prints `[]`.
- **FR-005**: `run <id>` MUST print the example's lines to standard output, each terminated by a newline, and exit 0. Unknown identifiers MUST print one line to the error stream naming the identifier and exit with status 2. An example that fails MUST exit with status 1.
- **FR-006**: `run --all` MUST run every example in identifier order, printing a separator line of dashes between consecutive examples, and exit 0, or 1 if any example failed.
- **FR-007**: Every language's output MUST be produced by the example itself; the host adds nothing but the separator in `run --all`.

**Per-language usability**

- **FR-008**: Each language MUST be runnable on its own from its directory with the commands its README documents, and from the repository root through the catalog's `run:` command for that language.

**Orchestrator**

- **FR-009**: The orchestrator MUST read `catalog.yaml` and treat it as the only source of pattern, language and implementation-path information.
- **FR-010**: `patterns list [--lang <l>]` MUST show the identifiers each language reports, grouped by language, or only the named language.
- **FR-011**: `patterns run <id> [--lang <l>]` MUST run the identifier in every language (or the named one), printing one block per language headed by the language name, in catalog order; a language without a declared implementation is shown as not implemented; an identifier not in the catalog fails before any language is invoked.
- **FR-012**: `patterns run --all [--lang <l>]` MUST run every catalogued pattern that has implementations, in catalog order.
- **FR-013**: `patterns snapshot [--update]` MUST write `snapshots/<id>/<language>.txt` for every declared implementation, refusing to overwrite an existing file that differs unless `--update` is given, and reporting each file written, unchanged or skipped.
- **FR-014**: `patterns check` MUST rerun every declared implementation, compare byte for byte with its snapshot, compare languages with each other for `parity: strict` patterns, and fail on any drift or strict mismatch with the pattern, language(s) and first differing line named. Loose mismatches are reported without failing.
- **FR-015**: `patterns validate` MUST verify catalog consistency: documentation files exist, implementation paths exist, each language's `list` includes every identifier declared for it and nothing declared for it is missing, snapshots exist for declared implementations, the expected-output block in each documentation file equals the reference snapshot, identifiers are kebab-case, and no duplicate identifiers. With `--write-readme` it MUST regenerate the README catalogue between the `<!-- catalogue:start -->` and `<!-- catalogue:end -->` markers, and without the flag it MUST fail if the section is stale.
- **FR-016**: All orchestrator commands MUST exit 0 on success and 1 on any failure, and print human-readable results; `list` additionally supports `--json`.
- **FR-017**: The orchestrator MUST NOT contain knowledge of any language's internals beyond the `run:` command line in the catalog.

**Repository integration**

- **FR-018**: The root Makefile targets `list`, `run`, `run-all`, `snapshot`, `check`, `validate` MUST delegate to the orchestrator with the documented variables (`P`, `L`, `UPDATE`).
- **FR-019**: A conformance workflow in GitHub Actions MUST set up all four toolchains, build the Java artefact, and run `patterns validate` and `patterns check` on pushes to `master` and on pull requests.
- **FR-020**: Fixture examples used for acceptance MUST live only in test code (test class path, test package, test-only registry) and MUST NOT appear in any production `list`.

### Key Entities

- **Catalog**: the list of languages (name, directory, run command) and patterns (id, icon, name, category, intent, doc path, parity, implementation paths per language).
- **Example**: an identifier plus a run operation that emits lines through an Output.
- **Output**: a sink receiving lines; concrete forms are the console and an in-memory buffer for tests.
- **Snapshot**: the recorded lines of one example in one language, stored at `snapshots/<id>/<language>.txt`.
- **Run result**: identifier, language, exit status, captured lines, error message if any; the unit the orchestrator compares and reports.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In each of the four languages, the fixture-based acceptance scenarios of Stories 1 to 3 pass in that language's test suite.
- **SC-002**: On the production build of each language, `list` prints `[]` and `run <anything>` exits with status 2, verified by tests.
- **SC-003**: The orchestrator's scenarios of Stories 4 and 5 pass against a fixture catalog and fixture language commands in its own test suite, including drift detection naming pattern, language and line.
- **SC-004**: `patterns validate` succeeds on the committed repository, and `patterns check` succeeds on it (no implementations, nothing to compare).
- **SC-005**: Each of the five projects (four languages plus orchestrator) passes its build with line coverage above 90 % and branch coverage above 90 %, lint and type checks clean, with only the command-line entry point excluded from measurement.
- **SC-006**: A learner can go from a fresh clone to seeing the output of any example in any language with three commands: `sdk env`, `make setup`, `make run P=<id> L=<lang>`.
- **SC-007**: A single command (`make check`) tells a maintainer in under two minutes on a laptop whether every implementation still matches its recording.
- **SC-008**: The conformance workflow is green on the feature branch.

## Assumptions

- The four language projects, their build files and coverage gates exist (Phase 0).
- Exit status 2 is reserved for "unknown example", 1 for any other failure, in both the language commands and the orchestrator.
- Language order for side-by-side output is the order of the `languages:` map in the catalog.
- The reference snapshot for the documentation's expected-output comparison is the first language in catalog order that has an implementation.
- Snapshot files end with a single trailing newline after the last line; an example that emits no lines produces an empty file.
- The orchestrator invokes each language through the `run:` command in the catalog, resolved from the repository root; Java requires the jar to have been built (`make setup` does this).
- Fixture examples are named so they cannot collide with real pattern identifiers (prefix `fixture-`).
- No pattern documentation exists yet, so the documentation checks of validation are exercised only by the orchestrator's tests until spec 002.
