# Pattern Specification: Strategy

**Feature Branch**: `002-strategy`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `strategy` · **Category**: behavioural · **Icon**: 💡 · **Parity**: strict

**Input**: User description: "Strategy pattern — first pattern spec, moved from the original Java project and implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it [1, p. 315].

**Also known as**: Policy

**Participants**: Strategy, ConcreteStrategyA, ConcreteStrategyB, Context, Client. These names are used in all four languages (the original project's `StrategyImpl1`/`StrategyImpl2` are renamed to the literature's `ConcreteStrategyA`/`ConcreteStrategyB`).

**Origin**: original project (moved from `java-patterns-and-constructs`, package `strategy`)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

A learner opens `docs/patterns/strategy.md` and, without running anything,
understands the problem Strategy solves, its structure and its participants,
and can see which class or function plays each role in each language.

**Independent Test**: The doc exists with every section of the outline, a
Mermaid class diagram of the participants only, a participants table with one
column per language, and an expected output block.

**Acceptance Scenarios**:

1. **Given** the doc, **When** a reader looks at the Structure section, **Then** the diagram shows exactly Strategy, ConcreteStrategyA, ConcreteStrategyB and Context (Client optional as a generic box) and no host plumbing (Example, Output, registry, ServiceLoader, CLI).
2. **Given** the doc, **When** a reader follows a link in the Participants table, **Then** it resolves to the named class or function in that language's directory.
3. **Given** the doc, **When** a reader looks at Language notes, **Then** it explains how a single-method strategy collapses into a lambda (Java), a plain function (Python, JavaScript) and a function type (TypeScript), and why the explicit classes are kept.

---

### User Story 2 - Run the example in any language (Priority: P1)

A learner runs the Strategy example in the language they know and reads its
output, then runs it in another language and sees the same output.

**Independent Test**: `make run P=strategy L=<lang>` prints the expected
output for each of the four languages; `make run P=strategy` prints them
side by side and they are identical.

**Acceptance Scenarios**:

1. **Given** any language, **When** `<runner> list` runs, **Then** `strategy` is in the JSON array.
2. **Given** any language, **When** `<runner> run strategy` runs, **Then** stdout equals `snapshots/strategy/<language>.txt` and the exit code is 0.

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

- The context is constructed with one strategy and later switched: the output shows both results, in order, proving the algorithm changed at run time without the context changing.
- No nondeterminism: the example has no I/O, randomness or threads.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The doc `docs/patterns/strategy.md` MUST contain the sections Intent, Motivation, Structure, Participants, The example, Consequences, Language notes, Related patterns, References, in that order.
- **FR-002**: The Structure section MUST be a Mermaid `classDiagram` containing only the participants listed in Pattern Summary.
- **FR-003**: Each of `java/`, `python/`, `typescript/`, `javascript/` MUST contain an idiomatic implementation using the participant names above and the fewest classes or functions that show the structure.
- **FR-004**: Each language MUST register an Example with id `strategy` whose output follows the output conventions (heading line, two-space indent, plain ASCII, deterministic).
- **FR-005**: The four outputs MUST be byte-identical.
- **FR-006**: Each language MUST have tests of the pattern's behaviour and a test asserting the example's exact lines.
- **FR-007**: `catalog.yaml` MUST contain the entry with `id`, `icon`, `name`, `category`, `intent`, `doc`, `parity` and the four implementation paths.
- **FR-008**: `snapshots/strategy/<language>.txt` MUST exist for all four languages.
- **FR-009**: The README catalogue table MUST be regenerated (`patterns validate --write-readme`).

### Pattern-specific requirements

- **FR-010**: `Strategy` declares one operation, `executeAlgorithm()`, returning text; `ConcreteStrategyA` returns `--> algorithm from ConcreteStrategyA` and `ConcreteStrategyB` returns `==> algorithm from ConcreteStrategyB`.
- **FR-011**: `Context` is constructed with a strategy, exposes `operation()` returning `Operation with ` followed by the strategy's result, and `setStrategy()` to replace the strategy at run time.
- **FR-012**: The example (the Client) builds a context with ConcreteStrategyA, runs the operation, switches to ConcreteStrategyB and runs it again, emitting one line per result.
- **FR-013**: Behaviour tests in each language MUST cover: the operation delegates to the configured strategy, and switching the strategy changes the result of the next operation.

### Expected output

```
Executing Strategy Pattern Implementation
  Operation with --> algorithm from ConcreteStrategyA
  Operation with ==> algorithm from ConcreteStrategyB
```

## Success Criteria *(mandatory)*

- **SC-001**: `patterns validate` and `patterns check` pass on the feature branch.
- **SC-002**: Every language project passes its build with line coverage > 90 % and branch coverage > 90 %, lint and type checks clean.
- **SC-003**: `make run P=strategy` prints four identical outputs.
- **SC-004**: A reader can name the class or function playing each participant role in each language from the doc alone.
- **SC-005**: The conformance, java, python and node workflows are green on the feature branch.

## Assumptions

- The CLI runner (spec 001) and the orchestrator are in place (merged 2026-09-18).
- Participant names follow Gamma et al.: the original `StrategyImpl1`/`StrategyImpl2` become `ConcreteStrategyA`/`ConcreteStrategyB`, and the output text is adjusted to name them; the arrows `-->` and `==>` from the original are kept so the two algorithms are visibly different.
- Language idioms to describe in Language notes, not to draw: Java's `Strategy` is a functional interface, so a lambda could replace either concrete class; in Python and JavaScript a bare function would do; in TypeScript a function type alias would do. All four keep explicit named classes so the structure in the diagram is visible in the code, per constitution Principle IV.
- Folder names: `strategy` in all four languages (single word, no separator issue).
