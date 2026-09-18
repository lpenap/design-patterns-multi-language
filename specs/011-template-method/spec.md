# Pattern Specification: Template Method

**Feature Branch**: `011-template-method`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `template-method` · **Category**: behavioural · **Icon**: 📝 · **Parity**: strict

**Input**: User description: "Template Method — moved from the original Java project, implemented in all four languages, with a hook operation added."

## Pattern Summary *(mandatory)*

**Intent**: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure [1, p. 325].

**Also known as**: none

**Participants**: AbstractClass, ConcreteClassA, ConcreteClassB, Client. The original's `stepOne`/`stepTwo` become the literature's `primitiveOperation1`/`primitiveOperation2`, and a `hook()` with a default is added so both kinds of overridable step appear.

**Origin**: original project (package `templatemethod`)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows AbstractClass with the final template method, the two abstract primitive operations and the hook, the two concrete classes, and a generic Client.
2. **Given** the doc, **When** a reader reads Participants, **Then** the difference between abstract primitive operations and hooks is stated.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `template-method`; `<runner> run template-method` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- The template method cannot be overridden where the language allows enforcing it (`final` in Java; documented in the others).
- A subclass that overrides neither hook nor primitive operations cannot exist (abstract), except in JavaScript where the base throws.

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `AbstractClass.templateMethod()` returns `primitiveOperation1()` + ` then ` + `primitiveOperation2()` + `hook()`; `hook()` defaults to the empty string; the primitive operations are abstract.
- **FR-011**: `ConcreteClassA` implements the primitive operations returning `ConcreteClassA.primitiveOperation1` and `ConcreteClassA.primitiveOperation2`; `ConcreteClassB` does likewise with its own name and overrides `hook()` to return ` with hook`.
- **FR-012**: The client calls the template method on an instance of each concrete class through the abstract type and prints the results.
- **FR-013**: Behaviour tests: both results; the hook default; the template method skeleton is the base class's (the word `then` is not in any subclass).

### Expected output

```
Executing Template Method Pattern Implementation
  ConcreteClassA.primitiveOperation1 then ConcreteClassA.primitiveOperation2
  ConcreteClassB.primitiveOperation1 then ConcreteClassB.primitiveOperation2 with hook
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `templatemethod` (Java, Python), `template-method` (TypeScript, JavaScript).
