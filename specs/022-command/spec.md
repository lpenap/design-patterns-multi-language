# Pattern Specification: Command

**Feature Branch**: `022-command`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `command` · **Category**: behavioural · **Icon**: 👫 · **Parity**: strict

**Input**: User description: "Command pattern — new, designed from Gamma et al., implemented in all four languages, with undo."

## Pattern Summary *(mandatory)*

**Intent**: Encapsulate a request as an object, thereby letting you parameterise clients with different requests, queue or log requests, and support undoable operations [1, p. 233].

**Also known as**: Action, Transaction

**Participants**: Command, ConcreteCommand, Receiver, Invoker, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows the Command interface with `execute()` and `undo()`, ConcreteCommand bound to a Receiver, the Invoker holding commands and a history, and a generic Client.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `command`; `<runner> run command` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Undo with an empty history does nothing and reports so (tested).
- Undo reverses the most recent command first, and a second undo the one before (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Receiver` keeps an ordered list of words; `action(word)` appends, `reverse(word)` removes the last word, `getState()` returns the words joined by a space.
- **FR-011**: `Command` declares `execute()`, `undo()` and `describe()`; `ConcreteCommand(receiver, word)` implements them by calling `action`/`reverse` and describes itself as `ConcreteCommand(<word>)`.
- **FR-012**: `Invoker.execute(command)` runs the command and pushes it on a history; `undo()` pops the most recent command and calls its `undo()`, returning it, or returns nothing when the history is empty.
- **FR-013**: The client executes commands for `Hello` and `World`, undoes once, and after each step prints `Executed`/`Undone`, the command description and the receiver's state.
- **FR-014**: Behaviour tests: execute and undo on the receiver; invoker history order; undo on empty history; a test-local command works with the invoker.

### Expected output

```
Executing Command Pattern Implementation
  Executed ConcreteCommand(Hello): state = Hello
  Executed ConcreteCommand(World): state = Hello World
  Undone ConcreteCommand(World): state = Hello
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `command` everywhere.
