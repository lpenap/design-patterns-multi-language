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
