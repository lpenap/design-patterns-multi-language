# Conventions

How a pattern is documented and implemented in this repository. The binding
version of these rules is the constitution in `.specify/memory/constitution.md`;
this page is the readable walkthrough.

## Pattern document (`docs/patterns/<id>.md`)

Sections, in this order:

1. **Intent** — one or two sentences, in the words of the reference literature.
2. **Motivation** — the forces that make the naive solution inadequate.
3. **Structure** — a Mermaid `classDiagram` showing **only the pattern's
   participants**. Never the Example, the Output sink, registries,
   `ServiceLoader` or the CLI. When the client role matters, draw a generic
   `Client`.
4. **Participants** — a table: role (as named in the literature), responsibility,
   and one column per language linking to the class or function that plays it.
5. **The example** — what the runner does and the expected output block, which
   must equal `snapshots/<id>/<language>.txt`.
6. **Consequences** — benefits, costs, common misuses.
7. **Language notes** — how idioms change the pattern in each language (lambdas
   as strategies in Java, first-class functions in Python and JavaScript,
   structural typing in TypeScript).
8. **Related patterns**.
9. **References** — numbered, resolving to [`references.md`](references.md).

## Implementation

* One folder per pattern inside each language project. Folder names follow the
  language: `chainofresponsibility` in Java and Python,
  `chain-of-responsibility` in TypeScript and JavaScript. The catalog id is
  always kebab-case.
* Class and function names follow the participant roles in the literature.
* Fewest classes that still show the structure; idiomatic to the language; no
  frameworks.
* The *Example* has an `id` equal to the catalog id and `run(out)` writing only
  through `out.line(...)`.

## File layout

One top-level class, interface or protocol per file, named after it, in every
language. Strategy as the worked example:

| Language | Files in the pattern folder |
|---|---|
| Java | `Strategy.java`, `ConcreteStrategyA.java`, `ConcreteStrategyB.java`, `Context.java`, `StrategyExample.java` |
| Python | `__init__.py` (re-exports the names and `example`), `strategy.py`, `concrete_strategy_a.py`, `concrete_strategy_b.py`, `context.py`, `example.py` |
| TypeScript | `strategy.ts`, `concrete-strategy-a.ts`, `concrete-strategy-b.ts`, `context.ts`, `example.ts` |
| JavaScript | same as TypeScript with `.js` |

Tests come in two files per pattern: the pattern's behaviour and the example's
exact lines (`StrategyTest.java` + `StrategyExampleTest.java`;
`test_strategy.py` + `test_strategy_example.py`; `strategy.test.ts` +
`example.test.ts`; likewise `.js`).

Cross-references between participants use type-only imports
(`from __future__ import annotations` with `TYPE_CHECKING` in Python,
`import type` in TypeScript). The one runtime cycle in the catalogue, State's
two concrete states creating each other, uses a function-local import in
Python and relies on ESM live bindings in TypeScript and JavaScript.

`patterns validate` reports files that declare more than one top-level type or
whose name does not match the type they declare.

## Output

```
Executing <Name> Pattern Implementation
  <detail line>
  <detail line>
```

Plain ASCII, two-space indent, a handful of lines, under a second,
deterministic, identical across languages unless the catalog says
`parity: loose`.

## Tests and gates

Per language: behaviour tests for the pattern and an example test asserting the
exact lines. Line and branch coverage above 90 %. Lint and type checks clean.
`make validate` and `make check` green before merging into `master`.

## Adding a pattern

Follow the Spec Kit flow: create the feature from
`.specify/templates/pattern-spec-template.md`, plan, generate tasks from
`.specify/templates/pattern-tasks-template.md`, implement. The definition of
done is in `PLAN.md §7.4`.
