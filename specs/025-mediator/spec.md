# Pattern Specification: Mediator

**Feature Branch**: `025-mediator`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `mediator` · **Category**: behavioural · **Icon**: 💐 · **Parity**: strict

**Input**: User description: "Mediator pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently [1, p. 273].

**Also known as**: none

**Participants**: Mediator, ConcreteMediator, Colleague, ConcreteColleague1, ConcreteColleague2, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Mediator/ConcreteMediator, the Colleague base holding a Mediator, the two concrete colleagues with no link between them, and a generic Client.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `mediator`; `<runner> run mediator` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- A colleague never holds a reference to another colleague; all traffic passes through the mediator (tested by substituting a recording mediator).
- Messages are routed in both directions (shown).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Mediator` declares `notify(sender, message)`; `Colleague` holds a mediator, `send(message)` calls `mediator.notify(this, message)`, `receive(message)` records it, `received()` returns the list, `name()` returns the class name.
- **FR-011**: `ConcreteMediator` knows both colleagues (`setColleague1/2` or constructor) and routes a message from either colleague to the other.
- **FR-012**: The client wires two colleagues to one mediator, has colleague 1 send `hello` and colleague 2 send `hi`, printing `<sender> sends: <message>` and `<receiver> receives: <message>` for each.
- **FR-013**: Behaviour tests: routing in both directions; a recording mediator proves colleagues talk only to the mediator; received lists accumulate in order.

### Expected output

```
Executing Mediator Pattern Implementation
  ConcreteColleague1 sends: hello
  ConcreteColleague2 receives: hello
  ConcreteColleague2 sends: hi
  ConcreteColleague1 receives: hi
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `mediator` everywhere.
