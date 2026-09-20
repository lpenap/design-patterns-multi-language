# Feature Specification: One Class per File — Conventions and Validator

**Feature Branch**: `029-one-class-per-file-conventions`

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "Phase 4 opener: write the one-class-per-file rules into the constitution and conventions, update the pattern templates, and make `patterns validate` report files that hold more than one top-level class or whose name does not match the class, as warnings until every language is migrated."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A contributor knows the file layout to follow (Priority: P1)

A contributor adding a pattern reads the constitution and `docs/conventions.md` and finds, for each language, the file per participant, its naming rule, where the example lives, how tests are split, and how to handle cross-references between participants.

**Acceptance Scenarios**:

1. **Given** `.specify/memory/constitution.md`, **When** read, **Then** Principle IV states the one-class-per-file rule with the per-language naming convention and the version is 1.1.0.
2. **Given** `.specify/templates/pattern-tasks-template.md`, **When** `/speckit-tasks` runs for a pattern, **Then** the generated tasks list one file per participant.

### User Story 2 - The validator points at files that break the rule (Priority: P1)

A maintainer runs `patterns validate` and sees, per implementation folder, every source file that declares more than one top-level class, interface or protocol, and every file whose name does not match the class it declares.

**Acceptance Scenarios**:

1. **Given** a Python module with two classes, **When** `patterns validate` runs, **Then** a warning names the file and both classes.
2. **Given** a TypeScript file `wrong-name.ts` declaring `export class Right`, **When** validation runs, **Then** a warning says the expected file name is `right.ts`.
3. **Given** a Java file with a nested class, **When** validation runs, **Then** no finding (nested types are allowed; the rule is about top-level declarations).
4. **Given** the current repository, **When** validation runs, **Then** it exits 0 (warnings only) and lists the Python, TypeScript and JavaScript files still to migrate.

### Edge Cases

- `__init__.py`, test files and test helpers are skipped.
- `example.py`, `example.ts`, `example.js` are exempt from the name check (their fixed name is the rule).
- Files with no declarations (constants, registries) produce no finding.

## Requirements *(mandatory)*

- **FR-001**: Constitution Principle IV gains the rule: one top-level class, interface or protocol per source file, named after it (PascalCase `.java`, snake_case `.py`, kebab-case `.ts`/`.js`); the example in `<Name>Example.java` / `example.py` / `example.ts` / `example.js`; Python `__init__.py` re-exports the public names and `example`; tests split into behaviour and example files; cross-references via type-only imports, with a function-local import for runtime cycles in Python. Version 1.1.0, amended 2026-09-20.
- **FR-002**: `docs/conventions.md` gains a "File layout" section with the Strategy worked example for the four languages.
- **FR-003**: The pattern spec and tasks templates list one file per participant.
- **FR-004**: `patterns validate` gains a structure check over every declared implementation path: per source file, the top-level declarations found by a per-language pattern; more than one → finding; declared name not matching the file name per the language's convention → finding. Level is a single constant, `warning` for this spec.
- **FR-005**: The check is unit-tested against the fixture repository (two-class module, misnamed file, nested class, skipped files).

## Success Criteria *(mandatory)*

- **SC-001**: Orchestrator tests pass with coverage above 90 %; `make validate` on the repository exits 0 and reports warnings for the unmigrated files only.
- **SC-002**: The four workflows are green on the PR.

## Assumptions

- Java is expected to produce no findings; if it does, the finding is a real inconsistency to fix in spec 033.
