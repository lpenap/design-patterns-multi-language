# Pattern Specification: Adapter

**Feature Branch**: `007-adapter`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `adapter` · **Category**: structural · **Icon**: 🔌 · **Parity**: strict

**Input**: User description: "Adapter pattern (object adapter) — moved from the original Java project, implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Convert the interface of a class into another interface clients expect. Adapter lets classes work together that could not otherwise because of incompatible interfaces [1, p. 139].

**Also known as**: Wrapper

**Participants**: Target, Adaptee, Adapter, Client. Names already match the literature; the object-adapter form is used.

**Origin**: original project (package `adapter`)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Target, Adapter (holding an Adaptee), Adaptee and a generic Client only.
2. **Given** the doc, **When** a reader reads Language notes, **Then** it explains class vs object adapters and where each language's standard library uses the pattern.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `adapter`; `<runner> run adapter` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- The adapter must work with any adaptee it is given (one adapter, many adaptees): tested with a subclass or stand-in adaptee.

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Target` declares `request()`; `Adaptee` provides the incompatible `specificRequest()` returning `Adaptee`.
- **FR-011**: `Adapter` implements `Target`, holds an `Adaptee` given at construction, and `request()` returns `Adapter(` + the adaptee's `specificRequest()` + `)`.
- **FR-012**: The client creates an adaptee, wraps it, and calls `request()` through the `Target` type, printing the result.
- **FR-013**: Behaviour tests: the translation; the adapter delegates to whichever adaptee it holds.

### Expected output

```
Executing Adapter Pattern Implementation
  Adapter(Adaptee)
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `adapter` everywhere.
