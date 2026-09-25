# Pattern Specification: Null Object

**Feature Branch**: `036-null-object-<lang>` (one branch and one PR per language: java, python, typescript, javascript)

**Created**: 2026-09-25

**Status**: Draft

**Catalog id**: `null-object` · **Category**: behavioural · **Icon**: 🫥 · **Parity**: strict

**Input**: User description: "Null Object — Phase 5 (decision 17), designed from Woolf [19] and Martin [8], absorbing Fowler's Special Case [18], implemented in all four languages, one PR per language."

## Pattern Summary *(mandatory)*

**Intent**: Provide a do-nothing collaborator with the expected interface, so that clients use it as they would a real one and never test for null [19].

**Also known as**: Special Case [18], Stub (when used only in tests)

**Participants**: AbstractObject (`Logger`), RealObject (`OutputLogger`), NullObject (`NullLogger`), Client (`OrderProcessor`).

**Principles**: Program to an interface, Liskov substitution principle.

**Origin**: Phase 5

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows `Logger` with `log(message)`, `OutputLogger` and `NullLogger` implementing it, and `OrderProcessor` depending on `Logger` only; **and** the Motivation explains why the client loses its conditionals.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `null-object`; `<runner> run null-object` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- The null logger accepts any message and produces no output (tested).
- The client's result does not depend on which logger it has (tested: same count with both).
- An empty order list processes zero orders and logs nothing (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Logger` declares `log(message)`. `OutputLogger` is built with an `Output` and writes `    [log] <message>` (four spaces) per call. `NullLogger` does nothing.
- **FR-011**: `OrderProcessor(logger).process(orders)` logs `processing <order>` for each order, unconditionally, and returns the number of orders.
- **FR-012**: The example runs the processor with an `OutputLogger` on the example's output and then with a `NullLogger`, printing `    processed N orders` after each run and a closing line.
- **FR-013**: Behaviour tests: real logger writes every message; null logger does nothing and the client still works; the processor logs once per order and returns the count, including for an empty list.

### Expected output

```
Executing Null Object Pattern Implementation
  OrderProcessor with OutputLogger:
    [log] processing order 1
    [log] processing order 2
    processed 2 orders
  OrderProcessor with NullLogger:
    processed 2 orders
  The processor never tested its logger for null
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass after every language PR · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs once all four PRs are merged · **SC-004** PR workflows green.

## Assumptions

- Folder names: `nullobject` (Java, Python), `null-object` (TypeScript, JavaScript).
- In JavaScript the abstract object is implicit (duck typing), as for the other patterns with an interface participant.
