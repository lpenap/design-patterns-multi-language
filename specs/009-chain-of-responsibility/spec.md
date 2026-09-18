# Pattern Specification: Chain of Responsibility

**Feature Branch**: `009-chain-of-responsibility`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `chain-of-responsibility` · **Category**: behavioural · **Icon**: 🐝 · **Parity**: strict

**Input**: User description: "Chain of Responsibility — moved from the original Java project, implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it [1, p. 223].

**Also known as**: none

**Participants**: Handler, ConcreteHandler (NegativeHandler, ZeroHandler, PositiveHandler), Client. The original's `Handler` interface plus `AbstractHandler` collapse into the literature's single abstract `Handler` that stores the successor and forwards by default.

**Origin**: original project (package `chainofresponsibility`)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows the abstract Handler with its successor link, the three concrete handlers and a generic Client.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `chain-of-responsibility`; `<runner> run chain-of-responsibility` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- A request no handler claims falls off the end and is reported as `unhandled` (tested with a shortened chain and with a lone handler).
- Relinking the chain changes who answers (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Handler` stores an optional successor, `setNext(handler)` sets it and returns it (so chains read left to right), and `handle(request)` forwards to the successor or returns `unhandled` when there is none.
- **FR-011**: `NegativeHandler`, `ZeroHandler`, `PositiveHandler` answer `negative`, `zero`, `positive` for the integers they own and defer the rest.
- **FR-012**: The client links negative → zero → positive and sends −1, 0 and 1 to the head, printing `<request> is <answer>`.
- **FR-013**: Behaviour tests: the three answers; unhandled on a shortened chain; a lone handler; relinking.

### Expected output

```
Executing Chain of Responsibility Pattern Implementation
  -1 is negative
  0 is zero
  1 is positive
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `chainofresponsibility` (Java, Python), `chain-of-responsibility` (TypeScript, JavaScript).
