# Pattern Specification: State

**Feature Branch**: `023-state`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `state` · **Category**: behavioural · **Icon**: 🐉 · **Parity**: strict

**Input**: User description: "State pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Allow an object to alter its behavior when its internal state changes. The object will appear to change its class [1, p. 305].

**Also known as**: Objects for States

**Participants**: Context, State, ConcreteStateA, ConcreteStateB, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Context holding a State, the two concrete states, and a generic Client; **and** Related patterns contrasts State with Strategy.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `state`; `<runner> run state` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Transitions are decided by the state objects, not the context (tested: the context never names a concrete state after construction).
- Concrete states carry no per-context data, so one instance can serve many contexts (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `State` declares `handle(context)` and `name()`; `ConcreteStateA.handle` transitions the context to `ConcreteStateB` and vice versa; `name()` returns the class name.
- **FR-011**: `Context` starts in `ConcreteStateA`; `request()` delegates to the current state and returns `request() handled by <old>, now in <new>`; `setState(state)` and `getStateName()` exist.
- **FR-012**: The client prints the initial state name, then the result of two `request()` calls.
- **FR-013**: Behaviour tests: initial state; alternation over several requests; state instances shared between two contexts; the context's code names no concrete state after construction.

### Expected output

```
Executing State Pattern Implementation
  Context in ConcreteStateA
  request() handled by ConcreteStateA, now in ConcreteStateB
  request() handled by ConcreteStateB, now in ConcreteStateA
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `state` everywhere.
