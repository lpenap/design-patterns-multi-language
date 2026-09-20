# Feature Specification: One Class per File — Python

**Feature Branch**: `030-python-<id>` (one branch and one pull request per pattern)

**Created**: 2026-09-20

**Status**: Draft

**Input**: User description: "Phase 4: move every Python pattern to one top-level declaration per file, per the constitution 1.1.0 rule, one PR per pattern, behaviour-preserving."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A reader finds each participant in its own file (Priority: P1)

**Acceptance Scenarios**:

1. **Given** `python/src/patterns/<pkg>`, **When** listed, **Then** it holds one file per participant named per the Python convention, plus the example file and an `__init__.py` that only re-exports.
2. **Given** the pattern's doc, **When** a reader follows a Python link in the Participants table, **Then** it opens the participant's own file.

### User Story 2 - Nothing observable changes (Priority: P1)

1. **Given** the refactored pattern, **When** `make check` runs, **Then** it still reports 108 ok with no snapshot changed.
2. **Given** `patterns validate`, **When** it runs, **Then** no one-class-per-file warning remains for this pattern in Python.

## Requirements *(mandatory)*

- **FR-001**: One top-level class/interface/protocol per file, named per the Python convention (`docs/conventions.md`, File layout).
- **FR-002**: The example lives in its fixed file name; the registry / package file is updated accordingly.
- **FR-003**: Tests split into a behaviour file and an example file.
- **FR-004**: Cross-references use type-only imports; runtime cycles per the constitution.
- **FR-005**: The doc's Participants table links to the per-file participants for Python.
- **FR-006**: Lint, type checks, tests and coverage gates stay green; `make check` unchanged.

## Success Criteria *(mandatory)*

- **SC-001**: Per pattern PR: four workflows green; `make check` 108 ok; no validator warning for the pattern in Python.
- **SC-002**: After the 27 PRs, `patterns validate` reports zero Python warnings.

## Assumptions

- Order: catalog order, one pattern at a time, cycling Python → TypeScript → JavaScript per pattern (PLAN.md §9 Phase 4).
