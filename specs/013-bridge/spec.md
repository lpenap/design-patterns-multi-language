# Pattern Specification: Bridge

**Feature Branch**: `013-bridge`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `bridge` · **Category**: structural · **Icon**: 🌉 · **Parity**: strict

**Input**: User description: "Bridge pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Decouple an abstraction from its implementation so that the two can vary independently [1, p. 151].

**Also known as**: Handle/Body

**Participants**: Abstraction, RefinedAbstraction, Implementor, ConcreteImplementorA, ConcreteImplementorB, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows the abstraction hierarchy (Abstraction, RefinedAbstraction) on one side, the implementor hierarchy (Implementor, ConcreteImplementorA/B) on the other, the bridge between them, and a generic Client.
2. **Given** the doc, **When** a reader reads Related patterns, **Then** the difference from Adapter (up front vs after the fact) is stated.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `bridge`; `<runner> run bridge` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Any implementor works with any abstraction (2 × 2 combinations in the example; a test-local implementor as a fifth).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Implementor` declares `operationImpl()`; `ConcreteImplementorA`/`B` return their class names.
- **FR-011**: `Abstraction` holds an `Implementor` given at construction; `operation()` returns `Abstraction(` + `operationImpl()` + `)`.
- **FR-012**: `RefinedAbstraction` extends `Abstraction` and overrides `operation()` to return `RefinedAbstraction(` + `operationImpl()` + `)`.
- **FR-013**: The client combines each abstraction with each implementor, printing four lines: Abstraction with A and B, then RefinedAbstraction with A and B.
- **FR-014**: Behaviour tests: the four combinations; a test-local implementor works with both abstractions.

### Expected output

```
Executing Bridge Pattern Implementation
  Abstraction(ConcreteImplementorA)
  Abstraction(ConcreteImplementorB)
  RefinedAbstraction(ConcreteImplementorA)
  RefinedAbstraction(ConcreteImplementorB)
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `bridge` everywhere.
