# Pattern Specification: Façade

**Feature Branch**: `015-facade`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `facade` · **Category**: structural · **Icon**: 🎁 · **Parity**: strict

**Input**: User description: "Façade pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Provide a unified interface to a set of interfaces in a subsystem. Façade defines a higher-level interface that makes the subsystem easier to use [1, p. 185].

**Also known as**: none

**Participants**: Facade, SubsystemA, SubsystemB, SubsystemC (subsystem classes), Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows the Facade in front of three subsystem classes and a generic Client that talks only to the Facade.
2. **Given** the doc, **When** a reader reads Consequences, **Then** it states that the façade does not prevent direct use of the subsystem.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `facade`; `<runner> run facade` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- The subsystem classes remain usable directly (tested): the façade adds a simpler entry point, it does not seal the subsystem.

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `SubsystemA.operationA()`, `SubsystemB.operationB()`, `SubsystemC.operationC()` each return `<Class>.<method>`.
- **FR-011**: `Facade.operation()` calls A, B and C in that order and returns `Facade.operation(): ` followed by the three results joined with `, `.
- **FR-012**: The client calls only the façade and prints the result.
- **FR-013**: Behaviour tests: the façade's combined result and order; each subsystem class directly.

### Expected output

```
Executing Facade Pattern Implementation
  Facade.operation(): SubsystemA.operationA, SubsystemB.operationB, SubsystemC.operationC
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Output is plain ASCII (`Facade`), while prose and headings keep `Façade`.
- Folder names: `facade` everywhere.
