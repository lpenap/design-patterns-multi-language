# Pattern Specification: Iterator

**Feature Branch**: `024-iterator`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `iterator` · **Category**: behavioural · **Icon**: 🍫 · **Parity**: strict

**Input**: User description: "Iterator pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation [1, p. 257].

**Also known as**: Cursor

**Participants**: Iterator, ConcreteIterator, Aggregate, ConcreteAggregate, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Iterator/ConcreteIterator and Aggregate/ConcreteAggregate with `createIterator()`, and a generic Client; **and** Language notes explain how each language's built-in iteration protocol is this pattern.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `iterator`; `<runner> run iterator` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- `next()` past the end raises the language's no-more-elements error (tested).
- Two iterators over one aggregate advance independently (shown and tested).
- An empty aggregate yields an iterator with `hasNext()` false (tested).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Iterator` declares `hasNext()` and `next()`; `Aggregate` declares `createIterator()`.
- **FR-011**: `ConcreteAggregate` holds an ordered list of strings with `add(item)` and `count()`; `createIterator()` returns a `ConcreteIterator` positioned at the start; the iterator reads the aggregate's items by index without exposing the list.
- **FR-012**: The client fills an aggregate with `a`, `b`, `c`, traverses it with one iterator printing the items space-separated, then shows two fresh iterators each returning `a` from `next()`.
- **FR-013**: Behaviour tests: order; end-of-traversal error; independence; empty aggregate.

### Expected output

```
Executing Iterator Pattern Implementation
  ConcreteIterator traversal: a b c
  Two iterators are independent: first.next()=a, second.next()=a
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- The GoF interface (`hasNext`/`next`) is implemented explicitly rather than the language's native protocol so the participants are visible; Language notes map it onto `java.util.Iterator`, `__iter__`/`__next__` and `Symbol.iterator`.
- Folder names: `iterator` everywhere.
