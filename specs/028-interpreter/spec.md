# Pattern Specification: Interpreter

**Feature Branch**: `028-interpreter`

**Created**: 2026-09-20

**Status**: Draft

**Catalog id**: `interpreter` · **Category**: behavioural · **Icon**: 🎶 · **Parity**: strict

**Input**: User description: "Interpreter pattern — new, designed from Gamma et al., implemented in all four languages."

## Pattern Summary *(mandatory)*

**Intent**: Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language [1, p. 243].

**Also known as**: none

**Participants**: AbstractExpression, TerminalExpression (`NumberExpression`, `VariableExpression`), NonterminalExpression (`AddExpression`, `SubtractExpression`), Context, Client.

**Origin**: new

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the pattern from the documentation (Priority: P1)

1. **Given** the doc, **When** a reader looks at Structure, **Then** the diagram shows AbstractExpression with `interpret(Context)`, the terminal and nonterminal expressions (nonterminals composing expressions), Context, and a generic Client; **and** the grammar is stated.

### User Story 2 - Run the example in any language (Priority: P1)

1. `<runner> list` includes `interpreter`; `<runner> run interpreter` equals the snapshot, exit 0.

### User Story 3 - Trust the recorded output (Priority: P2)

1. `patterns check` and `patterns validate` pass.

### Edge Cases

- Looking up an unassigned variable raises the language's error (tested).
- The same expression tree evaluates differently under different contexts (shown).
- Nesting to arbitrary depth (tested with three levels).

## Requirements *(mandatory)*

- **FR-001 … FR-009**: as in the pattern template.
- **FR-010**: Grammar: `expression ::= number | variable | expression '+' expression | expression '-' expression`.
- **FR-011**: `AbstractExpression` declares `interpret(context)` returning an integer and `describe()` returning the expression's text; terminals render as their number or name, nonterminals as `(<left> <op> <right>)`.
- **FR-012**: `Context` maps variable names to integers with `assign(name, value)` and `lookup(name)`; lookup of an unknown name raises an error naming it.
- **FR-013**: The client builds the tree for `((x + 3) - y)` by hand (parsing is outside the pattern), prints its description, then evaluates it under `x = 5, y = 2` and `x = 10, y = 0`.
- **FR-014**: Behaviour tests: terminals; each nonterminal; three-level nesting; unknown variable error; re-evaluation under another context.

### Expected output

```
Executing Interpreter Pattern Implementation
  Expression: ((x + 3) - y)
  With x = 5, y = 2: 6
  With x = 10, y = 0: 13
```

## Success Criteria *(mandatory)*

- **SC-001** `validate` and `check` pass · **SC-002** coverage gates and lint clean · **SC-003** four identical outputs · **SC-004** PR workflows green.

## Assumptions

- Folder names: `interpreter` everywhere.
