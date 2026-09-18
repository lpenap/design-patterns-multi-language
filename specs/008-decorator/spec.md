# Pattern Specification: Decorator

**Feature Branch**: `008-decorator`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `decorator` · **Category**: structural · **Icon**: 🍧 · **Parity**: strict

**Input**: User description: "Decorator pattern — moved from the original Java project, implemented in all four languages, with a second concrete decorator to show nesting."

## Pattern Summary *(mandatory)*

**Intent**: Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality [1, p. 175].

**Also known as**: Wrapper

**Participants**: Component, ConcreteComponent, Decorator, ConcreteDecoratorA, ConcreteDecoratorB, Client. The original's `ComponentIF` (named to avoid Spring's `@Component`) becomes `Component`; `ConcreteDecoratorB` is added so the example shows two decorators stacked.

**Origin**: original project (package `decorator`)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Component, ConcreteComponent, the abstract Decorator holding a Component, the two concrete decorators and a generic Client.
2. **Given** the doc, **When** a reader reads Language notes, **Then** it relates the pattern to Java's `java.io` streams, Python's function decorators and JavaScript's higher-order functions.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `decorator`; `<runner> run decorator` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Decorators nest in any order and the same decorator can be applied twice; tested.
- A decorator is not identical to its component (identity test).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Component` declares `operation()`; `ConcreteComponent.operation()` returns `ConcreteComponent`.
- **FR-011**: `Decorator` implements `Component`, holds a `Component` given at construction and forwards `operation()` to it by default.
- **FR-012**: `ConcreteDecoratorA`/`B` return their class name wrapping the delegated result in parentheses.
- **FR-013**: The client decorates a `ConcreteComponent` with A, prints the result, then decorates that with B and prints again.
- **FR-014**: Behaviour tests: single wrap; nesting order visible; applying the same decorator twice; decorator not identical to component.

### Expected output

```
Executing Decorator Pattern Implementation
  ConcreteDecoratorA(ConcreteComponent)
  ConcreteDecoratorB(ConcreteDecoratorA(ConcreteComponent))
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `decorator` everywhere.
