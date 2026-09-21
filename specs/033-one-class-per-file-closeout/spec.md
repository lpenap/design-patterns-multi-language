# Feature Specification: One Class per File — Close-out

**Feature Branch**: `033-one-class-per-file-closeout`

**Created**: 2026-09-21

**Status**: Draft

**Input**: User description: "Phase 4 closer: with Python, TypeScript and JavaScript migrated (specs 030–032, 81 PRs), turn the validator's one-class-per-file check into an error, review the Java tree against the same standard (naming, Javadoc, `final`), cross-check the Participants links of every doc, regenerate the README and retire the migration tooling."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A regression is caught, not reported (Priority: P1)

A contributor adds a second class to an existing module, or names a file after something other than the class it declares. `patterns validate` fails, the conformance workflow goes red, and the PR cannot merge.

**Acceptance Scenarios**:

1. **Given** the fixture repository with its two-class module and its misnamed file, **When** `patterns validate` runs, **Then** it exits 1 and prints those findings at `error` level.
2. **Given** the real repository, **When** `make validate` runs, **Then** it reports 27 patterns, 0 errors, 0 warnings.

### User Story 2 - Every participant links to its own file in every language (Priority: P1)

A reader of any pattern doc clicks a participant name in the Participants table and lands on the file that declares it, whichever language column they are in.

**Acceptance Scenarios**:

1. **Given** the 27 pattern docs, **When** every backticked PascalCase name in the Participants table is checked, **Then** it is a link and the linked file exists.
2. **Given** a name that is not a participant file (for example `ReentrantLock`, a JDK type named in a Java cell), **Then** it stays plain code.

### User Story 3 - Java meets the standard it set (Priority: P2)

Java was the reference layout for Phase 4. A reviewer reads any Java type and finds a Javadoc summary, `final` on classes not designed for extension, and file names matching the declared type.

**Acceptance Scenarios**:

1. **Given** the 139 Java sources, **When** scanned, **Then** every top-level type has a Javadoc comment immediately before its declaration.
2. **Given** the concrete classes, **When** scanned, **Then** each is `final` unless another class extends it (`AbstractClass`, `Abstraction`, `Colleague`, `Creator`, `Decorator`, `Handler`, `Subject`, `Example`) or a test stubs it by subclassing (`Adaptee`).

### Edge Cases

- The validator fixtures keep their deliberate violations for the structure unit tests; the validate and CLI tests remove them first through a shared helper.
- Interfaces are not exported in JavaScript, so a JavaScript cell may name fewer files than the TypeScript cell of the same row.

## Requirements *(mandatory)*

- **FR-001**: `ONE_CLASS_PER_FILE_LEVEL` in `tools/runner/src/commands/validate.ts` is `"error"`; the validate tests cover both a conformant fixture repository (exit 0) and the raw fixtures (exit 1, error findings).
- **FR-002**: Every Participants table links each participant name to the file declaring it, in all four language columns, via the repository-relative path used elsewhere in the docs.
- **FR-003**: Every Java top-level type carries a Javadoc summary sentence; concrete classes are `final` except those listed in User Story 3.
- **FR-004**: `README.md`'s catalogue section is regenerated and clean (`patterns validate` reports no staleness).
- **FR-005**: `tools/refactor/` (the Phase 4 migration scripts) is removed; PLAN.md marks Phase 4 delivered and ticks spec 033.

## Success Criteria *(mandatory)*

- **SC-001**: `make lint`, `make test` (coverage gates included), `make check` (108 ok, no snapshot changed) and `make validate` (0 errors, 0 warnings) pass locally and in the four workflows.
- **SC-002**: A scripted scan of the docs finds zero unlinked participant names whose file exists and zero broken relative links.

## Assumptions

- Behaviour is unchanged: no snapshot moves, so `make check` remains the safety net.
- The two Java classes left non-final for a reason (`Abstraction`, `Subject`) are parents in the pattern itself; `Adaptee` stays open because the adapter test stubs it by subclassing.
