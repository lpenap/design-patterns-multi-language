# Pattern Specification: [PATTERN NAME]

**Feature Branch**: `[###-pattern-id]`

**Created**: [DATE]

**Status**: Draft

**Catalog id**: `[pattern-id]` · **Category**: [creational | structural | behavioural | concurrency] · **Icon**: [emoji] · **Parity**: [strict | loose]

**Input**: User description: "$ARGUMENTS"

## Pattern Summary *(mandatory)*

**Intent**: [One or two sentences, in the words of the reference literature.]

**Also known as**: [aliases, or "none"]

**Participants**: [Role list from the literature, e.g. Strategy, ConcreteStrategy, Context, Client. These names are used in all four languages.]

**Origin**: [original project (moved from java-patterns-and-constructs) | new]

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

A learner opens `docs/patterns/[pattern-id].md` and, without running anything,
understands the problem the pattern solves, its structure and its participants,
and can see which class or function plays each role in each language.

**Independent Test**: The doc exists with every section of the outline, a
Mermaid class diagram of the participants only, a participants table with one
column per language, and an expected output block.

**Acceptance Scenarios**:

1. **Given** the doc, **When** a reader looks at the Structure section, **Then** the diagram shows exactly the participants listed above and no host plumbing (Example, Output, registry, ServiceLoader, CLI).
2. **Given** the doc, **When** a reader follows a link in the Participants table, **Then** it resolves to the named class or function in that language's directory.

---

### User Story 2 - Run the example in any language (Priority: P1)

A learner runs the example in the language they know and reads its output,
then runs it in another language and sees the same output.

**Independent Test**: `make run P=[pattern-id] L=<lang>` prints the expected
output for each of the four languages; `make run P=[pattern-id]` prints them
side by side and they are identical (or differ only as documented for `loose`).

**Acceptance Scenarios**:

1. **Given** any language, **When** `<runner> list` runs, **Then** `[pattern-id]` is in the JSON array.
2. **Given** any language, **When** `<runner> run [pattern-id]` runs, **Then** stdout equals `snapshots/[pattern-id]/<language>.txt` and the exit code is 0.

---

### User Story 3 - Trust the recorded output (Priority: P2)

A maintainer relies on CI to know that the four implementations still agree
with each other and with the documentation.

**Independent Test**: `patterns check` passes after the snapshots are
committed; deliberately changing one implementation's output makes it fail.

**Acceptance Scenarios**:

1. **Given** the committed snapshots, **When** `patterns check` runs, **Then** it reports no drift and no cross-language mismatch.
2. **Given** the doc, **When** `patterns validate` runs, **Then** the expected output block in the doc equals the reference snapshot.

### Edge Cases

- [What the example does at boundaries specific to this pattern, e.g. an empty chain, a request no handler accepts, a second `getInstance()` call.]
- [Any nondeterminism and how it is removed (fixed counts, ordered joins) or why `parity: loose` is unavoidable.]

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The doc `docs/patterns/[pattern-id].md` MUST contain the sections Intent, Motivation, Structure, Participants, The example, Consequences, Language notes, Related patterns, References, in that order. Right after the Intent text, a `*Principles:*` line MUST link the principles of `docs/principles.md` the pattern relies on; the line is omitted only when none applies.
- **FR-002**: The Structure section MUST be a Mermaid `classDiagram` containing only the participants listed in Pattern Summary.
- **FR-003**: Each of `java/`, `python/`, `typescript/`, `javascript/` MUST contain an idiomatic implementation using the participant names above and the fewest classes or functions that show the structure, **one top-level class per file named after it** (see `docs/conventions.md`, File layout).
- **FR-004**: Each language MUST register an Example with id `[pattern-id]` whose output follows the output conventions (heading line, two-space indent, plain ASCII, deterministic).
- **FR-005**: The four outputs MUST be byte-identical [or: MUST agree in the following lines, with `parity: loose` justified in the doc].
- **FR-006**: Each language MUST have tests of the pattern's behaviour and a test asserting the example's exact lines.
- **FR-007**: `catalog.yaml` MUST contain the entry with `id`, `icon`, `name`, `category`, `intent`, `doc`, `parity` and the four implementation paths.
- **FR-008**: `snapshots/[pattern-id]/<language>.txt` MUST exist for all four languages.
- **FR-009**: The README catalogue table MUST be regenerated (`patterns validate --write-readme`).

### Pattern-specific requirements

- **FR-010**: [What the example must demonstrate, e.g. "swaps the strategy at run time and shows both results".]
- **FR-011**: [...]

### Expected output

```
Executing [Pattern Name] Pattern Implementation
  [line]
  [line]
```

## Success Criteria *(mandatory)*

- **SC-001**: `patterns validate` and `patterns check` pass on the feature branch.
- **SC-002**: Every language project passes its build with line coverage > 90 % and branch coverage > 90 %, lint and type checks clean.
- **SC-003**: `make run P=[pattern-id]` prints four identical outputs [or: outputs agreeing as documented].
- **SC-004**: A reader can name the class or function playing each participant role in each language from the doc alone.

## Assumptions

- The CLI runner (spec 001) and the orchestrator are in place.
- [Any deviation from the constitution, with its justification, or "none".]
- [Language idioms that intentionally change the shape, to be described in Language notes, e.g. "in Python the ConcreteStrategy roles are plain functions".]
