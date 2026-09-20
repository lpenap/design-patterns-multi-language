# Pattern Specification: Flyweight

**Feature Branch**: `016-flyweight`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `flyweight` · **Category**: structural · **Icon**: 🍃 · **Parity**: strict

**Input**: User description: "Flyweight pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Use sharing to support large numbers of fine-grained objects efficiently [1, p. 195].

**Also known as**: none

**Participants**: Flyweight, ConcreteFlyweight, FlyweightFactory, Client. (UnsharedConcreteFlyweight is omitted; the doc mentions it.)

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Flyweight, ConcreteFlyweight with its intrinsic state, FlyweightFactory with its pool, and a generic Client passing extrinsic state.
2. **Given** the doc, **When** a reader reads Participants, **Then** intrinsic versus extrinsic state is defined.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `flyweight`; `<runner> run flyweight` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Requesting the same key twice returns the very same object (identity, tested).
- The factory's count grows only with distinct keys (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Flyweight` declares `operation(extrinsicState)`.
- **FR-011**: `ConcreteFlyweight(intrinsicState)` stores its intrinsic state; `operation(extrinsicState)` returns `ConcreteFlyweight(<intrinsic>) with extrinsic state <extrinsic>`.
- **FR-012**: `FlyweightFactory.getFlyweight(key)` returns the pooled flyweight for the key, creating it on first request; `count()` returns the pool size.
- **FR-013**: The client requests keys `a`, `b`, `a` with extrinsic states 1, 2, 3, prints each operation's result, then prints `Flyweights created: 2 for 3 requests`.
- **FR-014**: Behaviour tests: identity of repeated keys; count; the operation's text.

### Expected output

```
Executing Flyweight Pattern Implementation
  ConcreteFlyweight(a) with extrinsic state 1
  ConcreteFlyweight(b) with extrinsic state 2
  ConcreteFlyweight(a) with extrinsic state 3
  Flyweights created: 2 for 3 requests
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `flyweight` everywhere.
