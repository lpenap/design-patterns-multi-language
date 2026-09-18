# Pattern Specification: Simple Factory

**Feature Branch**: `005-simple-factory`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `simple-factory` · **Category**: creational · **Icon**: 🏗️ · **Parity**: strict

**Input**: User description: "Simple Factory idiom — moved from the original Java project (package `factory`), implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Centralise the creation of a family of related products behind a single method that decides which concrete class to instantiate, so that clients depend only on the product interface.

**Also known as**: Factory (idiom); not one of the GoF patterns [3, ch. 4].

**Participants**: Product, ConcreteProductA, ConcreteProductB, SimpleFactory, Client. The original's `ProductFactory` is renamed `SimpleFactory` so the class carries the idiom's name.

**Origin**: original project (package `factory`)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the idiom from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Product, the two concrete products, SimpleFactory and a generic Client only.
2. **Given** the doc, **When** a reader follows a Participants link, **Then** it resolves to the named class.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `simple-factory`; `<runner> run simple-factory` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- An unknown type code is rejected with the language's argument error (`IllegalArgumentException`, `ValueError`, `Error`); tested in every language. The example itself never triggers it.

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Product` declares `name()`; `ConcreteProductA`/`B` return their class names.
- **FR-011**: `SimpleFactory.createProduct(type)` maps `"A"` → `ConcreteProductA`, `"B"` → `ConcreteProductB`, anything else → argument error whose message contains the offending type.
- **FR-012**: The client requests `"A"` then `"B"` and prints each product's name.
- **FR-013**: Behaviour tests: both mappings; the unknown-type rejection; the client sees products only through `Product`.

### Expected output

```
Executing Simple Factory Pattern Implementation
  ConcreteProductA
  ConcreteProductB
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Heading colon dropped; product names changed from `Concrete Product A` to the class name `ConcreteProductA` for consistency with specs 003 and 004.
- Meyer's *Object-Oriented Software Construction* is added to `docs/references.md` for the open-closed principle.
- Folder names: `simplefactory` (Java, Python), `simple-factory` (TypeScript, JavaScript).
