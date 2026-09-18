# Pattern Specification: Observer

**Feature Branch**: `010-observer`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `observer` · **Category**: behavioural · **Icon**: 👓 · **Parity**: strict

**Input**: User description: "Observer pattern — from the original Java project, restructured to the literature's participants and made deterministic, implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically [1, p. 293].

**Also known as**: Dependents, Publish-Subscribe

**Participants**: Subject, ConcreteSubject, Observer, ConcreteObserver, Client.

**Origin**: original project (package `observer`), **restructured**: the original delegated to `java.beans.PropertyChangeSupport` and derived the new value from a random number, so its output varied between runs. Here the participants are explicit and the state changes are fixed.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Subject with its observer list and attach/detach/notify, ConcreteSubject with its state, the Observer interface, ConcreteObserver and a generic Client.
2. **Given** the doc, **When** a reader reads Language notes, **Then** it covers `PropertyChangeSupport` and the deprecated `java.util.Observable`, Python's callback idioms, and `EventTarget`/`EventEmitter`.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `observer`; `<runner> run observer` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Setting the state to its current value notifies nobody (tested).
- A detached observer receives nothing further (shown in the example and tested).
- Observers are notified in attachment order (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Observer` declares `update(oldState, newState)`.
- **FR-011**: `Subject` keeps an ordered list of observers with `attach(observer)`, `detach(observer)` and `notifyObservers(oldState, newState)`.
- **FR-012**: `ConcreteSubject.setState(value)` changes the state and notifies only when the value differs; `getState()` returns it.
- **FR-013**: `ConcreteObserver` has a name and a reporting callback; `update` reports `<name> notified: state <old> -> <new>`.
- **FR-014**: The client attaches observer1 and observer2, sets the state to 5, detaches observer2, sets the state to 10; each report is printed as one indented line.
- **FR-015**: Behaviour tests: both notified in order; detached observer silent; unchanged state notifies nobody; `getState()` reflects the last value.

### Expected output

```
Executing Observer Pattern Implementation
  observer1 notified: state 0 -> 5
  observer2 notified: state 0 -> 5
  observer1 notified: state 5 -> 10
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Push model: the notification carries old and new state so observers need not query the subject.
- The reporting callback in `ConcreteObserver` is a plain function type of the language (`Consumer<String>`, `Callable[[str], None]`, `(text: string) => void`), not the host's Output; the client supplies a lambda that indents and prints. This keeps the pattern code free of host plumbing while letting notifications appear in order.
- JavaBeans specification and the `java.util.Observable` deprecation note are added to `docs/references.md`.
- Folder names: `observer` everywhere.
