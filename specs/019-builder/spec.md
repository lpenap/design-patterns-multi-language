# Pattern Specification: Builder

**Feature Branch**: `019-builder`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `builder` · **Category**: creational · **Icon**: 👷 · **Parity**: strict

**Input**: User description: "Builder pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Separate the construction of a complex object from its representation so that the same construction process can create different representations [1, p. 97].

**Also known as**: none

**Participants**: Builder, ConcreteBuilder, Director, Product, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Director holding a Builder, ConcreteBuilder producing a Product, and a generic Client.
2. **Given** the doc, **When** a reader reads Language notes, **Then** the GoF Builder is distinguished from Bloch's fluent builder idiom.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `builder`; `<runner> run builder` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- The same director drives any builder (tested with a test-local builder producing a different representation).
- A builder used without the director produces whatever parts were requested (shown in the example).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Product` accumulates parts; `describe()` returns `Product(` + parts joined with `, ` + `)`.
- **FR-011**: `Builder` declares `buildPartA()`, `buildPartB()` and `getResult()`; `ConcreteBuilder` appends `PartA`/`PartB` to a fresh product and returns it from `getResult()`.
- **FR-012**: `Director.construct(builder)` calls `buildPartA()` then `buildPartB()` and returns the builder's result.
- **FR-013**: The client prints the director's product, then a product from a builder used directly with only part B.
- **FR-014**: Behaviour tests: director sequence; builder alone; a different builder under the same director; `getResult()` after no steps gives `Product()`.

### Expected output

```
Executing Builder Pattern Implementation
  Director.construct(ConcreteBuilder): Product(PartA, PartB)
  ConcreteBuilder alone, only part B: Product(PartB)
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `builder` everywhere.
