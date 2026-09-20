# Pattern Specification: Prototype

**Feature Branch**: `020-prototype`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `prototype` · **Category**: creational · **Icon**: 🃏 · **Parity**: strict

**Input**: User description: "Prototype pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype [1, p. 117].

**Also known as**: none

**Participants**: Prototype, ConcretePrototype1, ConcretePrototype2, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows the Prototype interface with `clone()`, the two concrete prototypes and a generic Client.
2. **Given** the doc, **When** a reader reads Language notes, **Then** shallow versus deep copy and each language's copying facility are covered.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `prototype`; `<runner> run prototype` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- A clone is a distinct object with equal state; changing the clone leaves the original untouched (shown and tested).
- Cloning through the `Prototype` type yields the concrete class of the original (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Prototype` declares `clone()` returning a `Prototype` and `describe()`.
- **FR-011**: `ConcretePrototype1(state)` and `ConcretePrototype2(state)` hold a string state with `setState()`; `describe()` returns `<Class>(state=<state>)`; `clone()` returns a new instance with the same state.
- **FR-012**: The client clones a `ConcretePrototype1(alpha)`, prints original and clone, whether they are distinct objects, the clone after `setState(beta)`, the original afterwards, and finally a clone of `ConcretePrototype2(gamma)`.
- **FR-013**: Behaviour tests: equal state after clone; distinct identity; independence after mutation; concrete class preserved through the interface.

### Expected output

```
Executing Prototype Pattern Implementation
  Original: ConcretePrototype1(state=alpha)
  Clone: ConcretePrototype1(state=alpha)
  Clone is a distinct object: true
  Clone after setState(beta): ConcretePrototype1(state=beta)
  Original after the clone changed: ConcretePrototype1(state=alpha)
  ConcretePrototype2 clone: ConcretePrototype2(state=gamma)
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Java implements `clone()` with a copy constructor rather than `Cloneable`, following Bloch [2, Item 13]; the doc explains why.
- Folder names: `prototype` everywhere.
