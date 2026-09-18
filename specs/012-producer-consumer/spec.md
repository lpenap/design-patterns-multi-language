# Pattern Specification: Producer/Consumer

**Feature Branch**: `012-producer-consumer`

**Created**: 2026-09-18

**Status**: Draft

**Catalog id**: `producer-consumer` · **Category**: concurrency · **Icon**: 🔄 · **Parity**: strict

**Input**: User description: "Producer/Consumer (bounded buffer) — from the original Java project, made deterministic and implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Coordinate threads that generate data with threads that process it through a bounded, thread-safe buffer: a producer waits while the buffer is full, a consumer waits while it is empty, and no item is lost or duplicated.

**Also known as**: the bounded-buffer problem

**Participants**: Producer, Consumer, BoundedBuffer, Coordinator (Client). The buffer is implemented by hand in every language (a monitor: one lock, two wait conditions) rather than delegated to a library queue as the original did, so the construct itself is visible.

**Origin**: original project (package `producerconsumer`), **restructured** for determinism: the original printed which consumer took which item, which depends on scheduling. Here the example prints a summary that is identical on every run and in every language.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the construct from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Producer and Consumer using BoundedBuffer's `put()` and `take()`, and a generic Coordinator.
2. **Given** the doc, **When** a reader reads Language notes, **Then** it explains real threads in Java and Python and the cooperative generator scheduler used in TypeScript and JavaScript, and why the output can still be identical.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `producer-consumer`; `<runner> run producer-consumer` equals the snapshot, exit 0, on every run.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass; parity is strict.

### Edge Cases

- `put()` on a full buffer waits until a `take()` (tested with a blocked thread or a blocked task).
- `take()` on an empty buffer waits until a `put()` (tested).
- Shutdown: consumers stop on a poison pill, one per consumer; no thread or task is left running when the example returns (tested by joining with a timeout).
- Deadlock in the cooperative scheduler (TypeScript, JavaScript): a producer with no consumer and more items than capacity stalls; the scheduler detects a round with no progress and raises an error (tested).
- Interruption (Java, Python): a blocked consumer interrupted or asked to stop exits cleanly where the language provides the mechanism.

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `BoundedBuffer(capacity)` offers `put(item)` (waits while full), `take()` (waits while empty) and `size()`; FIFO order.
- **FR-011**: `Producer` puts a given list of items into the buffer in order. `Consumer` takes items until it takes the poison pill, recording every item it consumed.
- **FR-012**: The coordinator uses capacity 2, one producer with the items 1 to 5 and two consumers; after the producer finishes it puts one poison pill per consumer, waits for all to finish, and prints the produced items, the consumed items sorted, and whether every item was consumed exactly once.
- **FR-013**: The output is byte-identical across runs and languages (strict parity): it contains no thread ids, timing or interleaving.
- **FR-014**: Behaviour tests: FIFO; blocking on full and on empty; end-to-end consumption exactly once; poison-pill shutdown; scheduler deadlock detection (TypeScript, JavaScript).

### Expected output

```
Executing Producer/Consumer Pattern Implementation
  Buffer capacity 2, 1 producer, 2 consumers
  Produced: 1 2 3 4 5
  Consumed: 1 2 3 4 5
  Each item consumed exactly once: true
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass with `parity: strict` · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs on repeated runs · **SC-004** PR workflows green.

## Assumptions

- The catalog entry changes from the provisional `parity: loose` to `strict`, since the summary output removes the nondeterminism.
- JavaScript and TypeScript have no shared-memory threads in the example's process; the construct is shown with cooperative tasks (generators) driven by a round-robin scheduler, where `put`/`take` yield only when they would block. This is the same wait/signal discipline without preemption, and the doc says so.
- Dijkstra (semaphores) and Lea are added to `docs/references.md`.
- Folder names: `producerconsumer` (Java, Python), `producer-consumer` (TypeScript, JavaScript).
