# Pattern Specification: Factory Method

**Feature Branch**: `004-factory-method`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `factory-method` · **Category**: creational · **Icon**: 🏭 · **Parity**: strict

**Input**: User description: "Factory Method pattern — from the original Java project, restored to the literature's structure, implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses [1, p. 107].

**Also known as**: Virtual Constructor

**Participants**: Product, ConcreteProductA, ConcreteProductB, Creator, ConcreteCreatorA, ConcreteCreatorB, Client.

**Origin**: original project (package `factorymethod`), **restructured**: the original named the creator `GenericProduct` and collapsed the product to a string. Here the full structure is present so the participants table maps one to one onto Gamma et al.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

A learner sees that the creator's template operation calls an abstract factory method, that subclasses decide the product, and that the client works through the creator type only.

**Acceptance Scenarios**:

1. **Given** the doc, **When** a reader looks at the Structure section, **Then** the diagram shows Creator, ConcreteCreatorA/B, Product, ConcreteProductA/B and the "creates" relations, and no host plumbing.
2. **Given** the doc, **When** a reader follows a Participants link, **Then** it resolves to the named class in that language.

### User Story 2 - Run the example in any language (Priority: P1)

1. **Given** any language, **When** `<runner> list` runs, **Then** `factory-method` is listed.
2. **Given** any language, **When** `<runner> run factory-method` runs, **Then** stdout equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` reports no drift or mismatch; `patterns validate` finds the doc block equal to the reference snapshot.

### Edge Cases

- A creator subclass that does not implement the factory method cannot be used: Java and TypeScript refuse at compile time, Python refuses at instantiation (abstract method), JavaScript throws when the operation runs. Each language's tests cover the behaviour available to it.

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Product` declares `name()`; `ConcreteProductA`/`B` return their class names.
- **FR-011**: `Creator` declares the abstract `factoryMethod()` returning a `Product` and the concrete template operation `anOperation()` returning `Built ` followed by the product's name.
- **FR-012**: `ConcreteCreatorA`/`B` override `factoryMethod()` to instantiate `ConcreteProductA`/`B`.
- **FR-013**: The client holds both creators through the `Creator` type and prints `anOperation()` of each.
- **FR-014**: Behaviour tests: each concrete creator's operation names its own product; the template operation uses whatever the subclass returns (a test-local creator subclass); the language's guard against a missing factory method.

### Expected output

```
Executing Factory Method Pattern Implementation
  Built ConcreteProductA
  Built ConcreteProductB
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Restructuring to the literature's participants is required by constitution Principle IV; the doc's Language notes keep the original's remark that factory methods are usually called within template methods, which `anOperation()` demonstrates.
- Folder names: `factorymethod` (Java, Python), `factory-method` (TypeScript, JavaScript).
