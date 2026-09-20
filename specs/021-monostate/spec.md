# Pattern Specification: Monostate

**Feature Branch**: `021-monostate`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `monostate` · **Category**: creational · **Icon**: 🔂 · **Parity**: strict

**Input**: User description: "Monostate — the Singleton alternative of Ball and Crawford, new, implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Share all state among every instance of a class while leaving instantiation unconstrained, so that clients get singleton-like behaviour through ordinary objects [7], [8].

**Also known as**: Borg (in the Python community)

**Participants**: Monostate, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows one class whose state is static (class-level) and whose accessors are instance methods, with a generic Client holding two instances.
2. **Given** the doc, **When** a reader reads Related patterns, **Then** the contrast with Singleton (uniqueness of *state* versus uniqueness of *instance*) is stated.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `monostate`; `<runner> run monostate` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Instances are distinct objects (identity differs) yet a write through any one is visible through all (tested).
- State persists across instances created later (tested).
- Because the state is process-global, tests set a known value before asserting rather than assuming a fresh state.

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Monostate` has an ordinary public constructor, a class-level (static) `value` field, and instance methods `getValue()` and `setValue(v)` that read and write the shared field.
- **FR-011**: The client creates two instances, prints that they are distinct objects, writes through the first and reads through the second, then writes through the second and reads through the first.
- **FR-012**: Behaviour tests: distinct identity; write-through visibility in both directions; visibility to an instance created after the write.

### Expected output

```
Executing Monostate Pattern Implementation
  Two instances are distinct objects: true
  a.setValue(42) then b.getValue(): 42
  b.setValue(7) then a.getValue(): 7
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Python's implementation must write through the class (`type(self)._value = v`) so that instance attribute assignment does not shadow the shared state; the doc explains this and the alternative Borg idiom (`__dict__` sharing).
- Folder names: `monostate` everywhere.
