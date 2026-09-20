# Pattern Specification: Composite

**Feature Branch**: `014-composite`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `composite` · **Category**: structural · **Icon**: 🌿 · **Parity**: strict

**Input**: User description: "Composite pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly [1, p. 163].

**Also known as**: none

**Participants**: Component, Leaf, Composite, Client. Child management (`add`) lives on `Composite` only, the *safe* variant [1, p. 167].

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows Component, Leaf, Composite with its children aggregation back to Component, and a generic Client.
2. **Given** the doc, **When** a reader reads Participants, **Then** the safety-versus-transparency choice is stated.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `composite`; `<runner> run composite` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- An empty composite renders as `Composite()` (tested).
- Composites nest to any depth (the example nests one level; tests two).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: `Component` declares `operation()`.
- **FR-011**: `Leaf(name).operation()` returns `Leaf(<name>)`.
- **FR-012**: `Composite.add(child)` appends and returns the composite; `operation()` returns `Composite(` + the children's operations joined with `+` + `)`.
- **FR-013**: The client prints a lone leaf, then a composite holding leaves A and B and a nested composite holding leaf C, both through the `Component` type.
- **FR-014**: Behaviour tests: leaf; empty composite; nesting two levels deep; the client code is the same call for leaf and composite.

### Expected output

```
Executing Composite Pattern Implementation
  Leaf(A)
  Composite(Leaf(A)+Leaf(B)+Composite(Leaf(C)))
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `composite` everywhere.
