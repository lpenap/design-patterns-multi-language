# Feature Specification: Phase 5 Opener — Catalogue, Principles, Future Work

**Feature Branch**: `034-phase-5-opener`

**Created**: 2026-09-25

**Status**: Draft

**Input**: User description: "Open Phase 5 (PLAN.md decisions 17–21): register the twenty-three new patterns and the Enterprise category in the catalogue with empty implementations, add the references the review introduced, write the principles page and cite it from every pattern doc, and record the generative AI and API design catalogues as future work for a separate project."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - The README shows what is coming (Priority: P1)

A reader opens the README and sees the full 50-entry catalogue, the twenty-three Phase 5 entries marked pending in every language, and a new Enterprise table.

**Acceptance Scenarios**:

1. **Given** `catalog.yaml`, **When** `patterns validate --write-readme` runs, **Then** the README gains an Enterprise section and 23 rows whose four language cells read `pending`.
2. **Given** the repository, **When** `make validate` and `make check` run, **Then** they report 50 patterns, 0 errors, 0 warnings and 108 ok respectively (pending patterns have no snapshots to check).

### User Story 2 - A pattern points at the principles it serves (Priority: P1)

A learner reading any pattern doc finds, right after the intent, the principles the pattern relies on, each linking to its statement and sources in `docs/principles.md`.

**Acceptance Scenarios**:

1. **Given** `docs/principles.md`, **When** read, **Then** it states twelve principles with citations to [3], [17] and the original sources ([1], [8], [9], [21], [22]).
2. **Given** the 27 existing docs, **When** scanned, **Then** 25 carry a `*Principles:*` line whose anchors all exist in `docs/principles.md`; Monostate and Singleton carry none because none applies.
3. **Given** `.specify/templates/pattern-spec-template.md`, **When** a Phase 5 spec is generated, **Then** FR-001 requires the principles line.

### User Story 3 - The deferred catalogues are documented for another project (Priority: P2)

Someone starting a generative AI or API patterns project finds, in `docs/future/`, the candidate patterns, the reasons they were left out of this repository and the approach the new project would take.

**Acceptance Scenarios**:

1. **Given** the README's Future work section, **When** followed, **Then** both documents open and cite [23] and [24] from the shared bibliography.

## Requirements *(mandatory)*

- **FR-001**: `catalog.yaml` gains the category `enterprise` and the 23 entries of PLAN.md §11 (id, icon, name, category, intent, doc, `parity: strict`) without `implementations`.
- **FR-002**: `docs/references.md` gains entries 17–24 (Head First OOA&D, Fowler, Woolf, Kircher & Jain, Hunt & Thomas, Liskov, Geewax, Lakshmanan & Hapke).
- **FR-003**: `docs/principles.md` exists with the twelve principles; every existing pattern doc that relies on at least one has the `*Principles:*` line after its intent; the pattern spec template requires it.
- **FR-004**: `docs/future/genai-patterns.md` and `docs/future/api-design-patterns.md` exist; README links them under Future work and links the principles page under Principles.
- **FR-005**: PLAN.md ticks spec 034 with its PR number.

## Success Criteria *(mandatory)*

- **SC-001**: `make lint`, `make test`, `make check`, `make validate` green locally and in the workflows.
- **SC-002**: No existing snapshot or implementation changes.

## Assumptions

- README rows of pending patterns link to docs that do not exist yet; each pattern's Java PR creates the doc. This matches Phase 0's behaviour and the validator does not check README links.
- Moving the java-monitor-example reference from the Producer/Consumer doc to the Monitor doc is part of spec 037 (decision 17).
