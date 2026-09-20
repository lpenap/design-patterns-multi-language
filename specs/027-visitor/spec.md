# Pattern Specification: Visitor

**Feature Branch**: `027-visitor`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `visitor` · **Category**: behavioural · **Icon**: 🏃 · **Parity**: strict

**Input**: User description: "Visitor pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates [1, p. 331].

**Also known as**: none

**Participants**: Visitor, ConcreteVisitor1, ConcreteVisitor2, Element, ConcreteElementA, ConcreteElementB, ObjectStructure, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows the Visitor hierarchy with one `visit` method per concrete element, the Element hierarchy with `accept(visitor)`, the ObjectStructure and a generic Client; **and** Motivation explains double dispatch.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `visitor`; `<runner> run visitor` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- `accept` dispatches to the visit method for the element's concrete class (tested per element).
- A new visitor is added without touching the element classes (the second visitor demonstrates it; a test adds a third).
- An empty object structure yields an empty result (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Visitor` declares `visitConcreteElementA(element)` and `visitConcreteElementB(element)`; `Element` declares `accept(visitor)`; each concrete element calls the visit method for its own class. `ConcreteElementA.operationA()` returns `A`, `ConcreteElementB.operationB()` returns `B`.
- **FR-011**: `ConcreteVisitor1` collects `visited <ElementClass>` per element and `result()` joins them with `, `; `ConcreteVisitor2` collects each element's operation result and `result()` joins them with `+`.
- **FR-012**: `ObjectStructure.add(element)` and `accept(visitor)` visit every element in order.
- **FR-013**: The client builds a structure with one A and one B, applies both visitors and prints `<VisitorClass>: <result>` for each.
- **FR-014**: Behaviour tests: dispatch per element; both visitors' results; empty structure; a test-local visitor.

### Expected output

```
Executing Visitor Pattern Implementation
  ConcreteVisitor1: visited ConcreteElementA, visited ConcreteElementB
  ConcreteVisitor2: A+B
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `visitor` everywhere.
