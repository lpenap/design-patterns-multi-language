# Pattern Specification: Abstract Factory

**Feature Branch**: `003-abstract-factory`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `abstract-factory` · **Category**: creational · **Icon**: 🌰 · **Parity**: strict

**Input**: User description: "Abstract Factory pattern — moved from the original Java project and implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Provide an interface for creating families of related or dependent objects without specifying their concrete classes [1, p. 87].

**Also known as**: Kit

**Participants**: AbstractFactory, ConcreteFactory1, ConcreteFactory2, AbstractProductA, AbstractProductB, ProductA1, ProductA2, ProductB1, ProductB2, Client. The original project's `Factory1`/`Factory2` and `ProductA`/`ProductB` are renamed to the literature's `ConcreteFactory1`/`ConcreteFactory2` and `AbstractProductA`/`AbstractProductB`.

**Origin**: original project (package `abstractfactory`)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

A learner opens `docs/patterns/abstract-factory.md` and understands why creation of a whole product family is moved into one object, sees the two families and their products in the diagram, and finds the class playing each role in each language.

**Independent Test**: The doc exists with every section of the outline, a Mermaid class diagram of the participants only, a participants table with one column per language, and an expected output block.

**Acceptance Scenarios**:

1. **Given** the doc, **When** a reader looks at the Structure section, **Then** the diagram shows exactly the two factory classes, the abstract factory, the two abstract products and the four concrete products, with a generic Client, and no host plumbing.
2. **Given** the doc, **When** a reader follows a link in the Participants table, **Then** it resolves to the named class in that language's directory.

### User Story 2 - Run the example in any language (Priority: P1)

**Independent Test**: `make run P=abstract-factory` prints four identical blocks.

**Acceptance Scenarios**:

1. **Given** any language, **When** `<runner> list` runs, **Then** `abstract-factory` is in the JSON array.
2. **Given** any language, **When** `<runner> run abstract-factory` runs, **Then** stdout equals `snapshots/abstract-factory/<language>.txt` and the exit code is 0.

### User Story 3 - Trust the recorded output (Priority: P2)

**Acceptance Scenarios**:

1. **Given** the committed snapshots, **When** `patterns check` runs, **Then** it reports no drift and no cross-language mismatch.
2. **Given** the doc, **When** `patterns validate` runs, **Then** the expected output block equals the reference snapshot.

### Edge Cases

- The client code never names a concrete product; switching the family is a one-token change (which factory is constructed). The tests assert this by exercising the client against both factories through the abstract type only.
- No nondeterminism.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001** to **FR-009**: as in the pattern template (nine-section doc, participants-only Mermaid diagram, four idiomatic implementations, Example with id `abstract-factory`, byte-identical output, behaviour and exact-lines tests, catalog entry, four snapshots, README regenerated).

### Pattern-specific requirements

- **FR-010**: `AbstractFactory` declares `createProductA()` and `createProductB()`; `ConcreteFactory1` returns `ProductA1`/`ProductB1`, `ConcreteFactory2` returns `ProductA2`/`ProductB2`.
- **FR-011**: `AbstractProductA` and `AbstractProductB` each declare `name()`; every concrete product returns its own class name.
- **FR-012**: The client creates both factories, asks each for both products through the abstract types, and emits one line per product name, family 1 first.
- **FR-013**: Behaviour tests cover: each factory produces the products of its own family, and the same client code works against either factory.

### Expected output

```
Executing Abstract Factory Pattern Implementation
  ProductA1
  ProductB1
  ProductA2
  ProductB2
```

## Success Criteria *(mandatory)*

- **SC-001**: `patterns validate` and `patterns check` pass.
- **SC-002**: Every language project passes its coverage gate (> 90 % line and branch), lint and type checks clean.
- **SC-003**: `make run P=abstract-factory` prints four identical outputs.
- **SC-004**: The pull request's four workflows are green.

## Assumptions

- The original heading ended with a colon; it is dropped to match the output convention `Executing <Name> Pattern Implementation`.
- Folder names: `abstractfactory` in Java and Python, `abstract-factory` in TypeScript and JavaScript.
- Language notes will cover: Python's Protocols for the abstract types and the common idiom of a factory being a module or a dict of callables; JavaScript's duck typing making the abstract product classes unnecessary; TypeScript's structural interfaces.
