# Pattern Specification: Singleton

**Feature Branch**: `006-singleton`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `singleton` · **Category**: creational · **Icon**: 💍 · **Parity**: strict

**Input**: User description: "Singleton pattern — moved from the original Java project, implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Ensure a class has only one instance, and provide a global point of access to it [1, p. 127].

**Also known as**: none

**Participants**: Singleton, Client.

**Origin**: original project (package `singleton`)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows the single `Singleton` class with its private constructor, private static instance and `instance()` operation, plus a generic Client.
2. **Given** the doc, **When** a reader reads Language notes, **Then** each language explains how (or whether) it can hide the constructor and what the thread-safe alternatives are.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `singleton`; `<runner> run singleton` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- The example's output must not depend on whether the instance was already created by an earlier run in the same process (relevant for `run --all` and for tests): the example reports that two calls return the same object, which is true regardless.
- The textbook lazy initialisation is not thread-safe; the example is single-threaded and the doc says so.

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Singleton.instance()` lazily creates the sole instance and returns it thereafter; the constructor is hidden as far as the language allows.
- **FR-011**: `doSomething()` returns `Singleton is doing something`, standing for the instance's real responsibilities.
- **FR-012**: The client calls `instance()` twice, prints whether both calls returned the same object, then prints the result of `doSomething()`.
- **FR-013**: Behaviour tests: two calls return the same object; `doSomething()` returns the expected text; where the language can enforce it, direct construction is prevented (compile-time in Java and TypeScript; documented limitation in Python and JavaScript).

### Expected output

```
Executing Singleton Pattern Implementation
  Same instance returned twice: true
  Singleton is doing something
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- The original example printed only `Instantiating a Singleton`; the output is extended so the recorded lines demonstrate the pattern's guarantee.
- The doc keeps the original's thread-safety discussion for Java and adds the equivalents for the other languages; the JLS, Manson et al. and Bacon et al. references are added to `docs/references.md`.
- Folder names: `singleton` everywhere.
