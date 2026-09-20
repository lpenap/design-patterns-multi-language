# Pattern Specification: Memento

**Feature Branch**: `026-memento`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `memento` · **Category**: behavioural · **Icon**: 💾 · **Parity**: strict

**Input**: User description: "Memento pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later [1, p. 283].

**Also known as**: Token

**Participants**: Originator, Memento, Caretaker, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Originator creating and restoring from Memento, the Caretaker holding mementos without inspecting them, and a generic Client; **and** Participants explains the wide (originator) and narrow (caretaker) interfaces.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `memento`; `<runner> run memento` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Undo with no saved mementos leaves the originator unchanged and reports nothing to restore (tested).
- A memento captures the value at save time; later changes to the originator do not alter it (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Originator` holds a string state with `setState`/`getState`, `createMemento()` returning a memento of the current state, and `restore(memento)`.
- **FR-011**: `Memento` exposes its state only to the originator as far as the language allows (nested class in Java, opaque interface plus internal class in TypeScript, naming convention in Python and JavaScript); the caretaker treats it as opaque.
- **FR-012**: `Caretaker.save(originator)` stores `originator.createMemento()`; `undo(originator)` pops the most recent memento, restores it and returns true, or returns false when there is none.
- **FR-013**: The client sets A (save), B (save), C, then undoes twice, printing the state after each step.
- **FR-014**: Behaviour tests: save/restore sequence; undo on empty history; value capture independent of later changes.

### Expected output

```
Executing Memento Pattern Implementation
  Originator state: A (saved)
  Originator state: B (saved)
  Originator state: C
  Restored: B
  Restored: A
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `memento` everywhere.
