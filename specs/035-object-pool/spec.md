# Pattern Specification: Object Pool

**Feature Branch**: `035-object-pool-<lang>` (one branch and one PR per language: java, python, typescript, javascript)

**Created**: 2026-09-25

**Status**: Draft

**Catalog id**: `object-pool` · **Category**: creational · **Icon**: ♻️ · **Parity**: strict

**Input**: User description: "Object Pool — Phase 5 (decision 17), designed from Grand [25] and Kircher & Jain [20], implemented in all four languages, one PR per language."

## Pattern Summary *(mandatory)*

**Intent**: Reuse a bounded set of expensive-to-create objects by lending them out and taking them back, instead of creating and discarding one per use [25; 20].

**Also known as**: Pooling [20], Resource Pool

**Participants**: Reusable, ReusablePool (`ObjectPool`), Client.

**Principles**: Single responsibility principle, Encapsulate what varies.

**Origin**: Phase 5

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows `ObjectPool` (acquire, release, created), `Reusable` (task, uses, package-private assign and reset) and a generic Client; **and** the Motivation contrasts pooling with Flyweight.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `object-pool`; `<runner> run object-pool` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Acquiring from an exhausted pool raises the language's error with the message `pool exhausted, N of N in use` (tested and shown).
- Releasing an object that is not in use raises the language's error (tested).
- Released objects are recycled FIFO and reset (task cleared, use count kept) (tested).
- A non-positive capacity is rejected (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Reusable` has a sequential `id` (from 1), a `task` (null/None while idle) and a `uses` counter; `toString` is `Reusable#<id>`; `assign` and `reset` are for the pool only.
- **FR-011**: `ObjectPool(capacity)` creates objects lazily on `acquire(task)`, lends idle objects FIFO, keeps an in-use set, and exposes `capacity`, `created`, `available`, `inUse`.
- **FR-012**: Exhaustion → `IllegalStateException` (Java), `RuntimeError` (Python), `Error` (TypeScript, JavaScript), message `pool exhausted, <inUse> of <capacity> in use`. Foreign release → `IllegalArgumentException` (Java), `ValueError` (Python), `Error` (TypeScript, JavaScript), message `Reusable#<id> is not in use`.
- **FR-013**: The client runs tasks A, B, C against a pool of capacity 2, releases the first object, retries C, and prints the creation count.
- **FR-014**: Behaviour tests: lazy creation up to capacity; exhaustion message; FIFO reuse and use count; reset on release; foreign release; non-positive capacity.

### Expected output

```
Executing Object Pool Pattern Implementation
  Task A -> Reusable#1 (use 1)
  Task B -> Reusable#2 (use 1)
  Task C -> pool exhausted, 2 of 2 in use
  Released Reusable#1
  Task C -> Reusable#1 (use 2)
  Created 2 objects for 4 requests
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass after every language PR · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs once all four PRs are merged · **SC-004** PR workflows green.

## Assumptions

- Folder names: `objectpool` (Java, Python), `object-pool` (TypeScript, JavaScript).
- The Java PR carries the doc and the catalogue's Java path; each later PR adds its own path, snapshot and Participants links.
