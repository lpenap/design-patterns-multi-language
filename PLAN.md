# Plan: Design Patterns, Multi-Language

Iteration of [java-patterns-and-constructs](https://github.com/lpenap/java-patterns-and-constructs):
the same catalogue of design patterns and concurrency constructs, implemented in
**Java, Python, TypeScript and JavaScript**, with one academic write-up per pattern
and a single way to run every implementation and record its output.

This document records the architecture decisions, the repository layout, the
contract every language must honour, and the delivery phases. It is meant to be
revised as decisions are confirmed.

---

## 1. Goals and non-goals

**Goals**

1. One repository holds every language, yet each language stays an idiomatic,
   standalone project that a developer from that ecosystem recognises.
2. One academic document per pattern (intent, motivation, structure, participants,
   consequences, references), language-neutral, that links to each implementation.
3. One command runs any pattern in any language and shows the output; a reader
   without a toolchain sees the same output recorded in the repository, linked from
   the documentation.
4. Adding a pattern, or a language, touches a predictable and small set of places.
5. CI proves that every implementation runs, is tested, and that the four
   implementations of a pattern produce equivalent output.

**Non-goals (for now)**

* Framework showcases. The original used Spring Boot and Swing as a host; the host
  here is a thin CLI. The patterns are the product.
* A web site, static or served. Documentation is plain markdown browsed on GitHub.
  A site can be layered on later without changing the layout (see §5).

---

## 2. Decision: multi-language monorepo, language-first code, pattern-first docs

### Can it be one repo? Yes.

The two natural layouts are:

| Layout | Shape | Pros | Cons |
|---|---|---|---|
| **Pattern-first** | `patterns/strategy/{java,python,ts,js,README.md}` | Everything about one pattern in one folder; ideal for reading | Every build tool fights it: Maven wants one source root, Python wants importable packages, TS wants one `tsconfig` include tree. Each language project becomes a pile of glob hacks. |
| **Language-first** | `java/…`, `python/…`, `typescript/…`, `javascript/…` | Each dir is a canonical project (`pom.xml`, `pyproject.toml`, `package.json`). IDEs, linters, CI caches all just work. | The "one pattern" view is spread across four trees. |

**Decision:** language-first for code, pattern-first for documentation, and a single
machine-readable **catalog** that ties them together. The catalog is the decoupling
device: nothing in one language needs to know about another, and every cross-cutting
artefact (README tables, CI matrix, conformance checks) is
generated from or validated against it.

### `catalog.yaml` (single source of truth)

```yaml
version: 1
languages:
  java:       { name: Java,       dir: java,       run: "java -jar java/target/patterns.jar" }
  python:     { name: Python,     dir: python,     run: "uv run --project python patterns" }
  typescript: { name: TypeScript, dir: typescript, run: "pnpm --dir typescript exec tsx src/cli.ts" }
  javascript: { name: JavaScript, dir: javascript, run: "node javascript/src/cli.js" }

categories: [creational, structural, behavioural, concurrency]

patterns:
  - id: strategy               # kebab-case; folder names follow each language's convention
    icon: "💡"                  # used by the generated README table
    name: Strategy
    category: behavioural
    aka: [Policy]
    intent: Define a family of interchangeable algorithms and let the client choose one at run time.
    doc: docs/patterns/strategy.md
    parity: strict            # strict | loose (loose = nondeterministic output, e.g. threads)
    implementations:
      java:       java/src/main/java/com/penapereira/patterns/strategy
      python:     python/src/patterns/strategy
      typescript: typescript/src/strategy
      javascript: javascript/src/strategy
```

A pattern may list fewer than four implementations while being ported; the
validator reports the gaps and the generated README table marks them as pending.
The full list of catalogued patterns is in §11. Ids are kebab-case
(`chain-of-responsibility`); the per-language implementation paths carry the
folder name each language needs (`chainofresponsibility` for a Java package or a
Python module, `chain-of-responsibility` for TypeScript and JavaScript).

### Repository layout

```
design-patterns-multi-language/
├── catalog.yaml                  # single source of truth (see above)
├── README.md                     # overview, quickstart, catalogue table (generated section)
├── .sdkmanrc                     # java=25.0.4-tem
├── PLAN.md                       # this file
├── Makefile                      # thin façade: make run P=strategy L=python, make check, make snapshot
│
├── docs/                         # pattern-first academic documentation (language-neutral)
│   ├── patterns/<id>.md          # intent, motivation, structure, participants, consequences, refs
│   ├── conventions.md            # how to write a pattern doc and an implementation
│   └── references.md             # shared bibliography (GoF, Bloch, Goetz, …)
│
├── java/                         # Maven project, Maven wrapper, JDK 25
│   ├── pom.xml
│   └── src/{main,test}/java/com/penapereira/patterns/
│       ├── runtime/              # Example interface, Output sink, ServiceLoader discovery, CLI
│       └── <id>/                 # one package per pattern + <Id>Example.java
│
├── python/                       # uv project (pyproject.toml), src layout
│   ├── pyproject.toml
│   ├── src/patterns/
│   │   ├── runtime/              # Example protocol, Output sink, discovery, CLI (entry point `patterns`)
│   │   └── <id>/                 # one package per pattern, exposes `example`
│   └── tests/
│
├── typescript/                   # strict TS, tsx for dev, vitest
│   ├── package.json  tsconfig.json
│   └── src/{runtime,<id>}/
│
├── javascript/                   # plain ESM Node, no build step, node:test
│   ├── package.json
│   └── src/{runtime,<id>}/
│
├── tools/
│   └── runner/                   # orchestrator CLI (TypeScript): list | run | snapshot | check | validate
│
├── snapshots/<id>/<language>.txt # recorded output, committed; CI fails on drift
│
├── .github/workflows/            # java.yml python.yml node.yml conformance.yml
├── package.json                  # workspace root (scripts only)
└── pnpm-workspace.yaml           # typescript, javascript, tools/runner
```

Why these specific toolchains:

* **Java – Maven wrapper.** Continuity with the original and reproducible without a
  local Maven. Spring Boot, Lombok and Swing are dropped: discovery moves to
  `java.util.ServiceLoader`, the GUI is replaced by the CLI. Target **JDK 25 LTS** as
  the original does, pinned with `.sdkmanrc` (`java=25.0.4-tem`, already installed
  through SDKMAN; `sdk env` in the repo root selects it for the shell, and the Maven
  wrapper plus CI use the same version).
* **Python – uv.** Already installed, fast, handles interpreter + venv + lockfile.
  `src/` layout, `pytest`, `coverage`, `ruff`, `mypy`.
* **TypeScript and JavaScript as two projects, not one.** They are listed as two
  languages for a reason: TS shows nominal-ish interfaces and generics; JS shows the
  dynamic, duck-typed rendition (no interfaces, closures, prototypes). If JS were just
  compiled TS the educational contrast would be lost.
* **pnpm workspaces at root** for the two Node projects and the orchestrator. pnpm is
  not installed yet; it is installed in Phase 0 (version checked against the
  seven-day rule) and pinned through `packageManager` in the root `package.json` so
  Corepack and CI use the same one.
* **Makefile at root** as a discoverable façade over the four toolchains (`make setup`,
  `make test`, `make list`, `make run`, `make run-all`, `make snapshot`, `make check`). Every target is a one-liner that
  delegates; no logic lives in Make.

---

## 3. The implementation contract (what makes the languages interchangeable)

Every language honours the same small contract at two levels.

### 3.1 In-language contract (mirrors the original `ExampleRunnerInterface`)

| Concept | Java | Python | TypeScript | JavaScript |
|---|---|---|---|---|
| Example | `interface Example { String id(); void run(Output out); }` | `class Example(Protocol): id: str; def run(self, out: Output) -> None` | `interface Example { id: string; run(out: Output): void }` | object with `id` and `run(out)` |
| Output sink | `interface Output { void line(String); }` | `class Output(Protocol): def line(self, s: str)` | `interface Output { line(s: string): void }` | object with `line(s)` |
| Discovery | `ServiceLoader<Example>` via `META-INF/services` | import `patterns.<id>` for each subpackage, read `example` | `registry.ts` importing each `<id>/index.ts` | `registry.js` importing each `<id>/index.js` |

Rules carried over from the original, made language-neutral:

* Examples write through the injected `Output`, never to stdout directly, so tests
  capture output and the CLI can stream it.
* First line: `Executing <Name> Pattern Implementation`. Details indented two spaces.
  Plain ASCII, a handful of lines, under a second.
* Output is **deterministic**. Concurrency constructs must make it so (bounded
  buffer, fixed item count, ordered join) or the catalog marks them `parity: loose`.
* Class and function names follow the participant roles in the literature
  (`Context`, `ConcreteStrategyA`, `Handler`) so the docs' participants table maps
  onto every language.
* Every example threads its own tests: one for the pattern behaviour, one asserting
  the example runs and produces the expected lines.

### 3.2 Cross-language CLI protocol (what the orchestrator speaks)

Each language ships a tiny CLI with three commands and identical semantics:

```
<runner> list                 # JSON array of pattern ids this language implements
<runner> run <id>             # output lines to stdout, exit 0; exit 2 if id unknown
<runner> run --all            # every pattern, separated by a line of dashes
```

The orchestrator in `tools/runner` reads `catalog.yaml`, invokes the per-language
runner from the `run:` field, and adds:

```
patterns validate                       # catalog ↔ filesystem ↔ docs ↔ snapshots consistency
patterns run strategy                   # all languages, side by side
patterns run strategy --lang python
patterns snapshot [--update]            # write snapshots/<id>/<lang>.txt
patterns check                          # rerun everything, diff against snapshots, diff across languages
```

`check` is the **conformance gate**: it fails CI if any implementation drifts from its
recorded output, or if `parity: strict` patterns differ between languages.

Adding a **language** therefore means: a new top-level dir, a `list`/`run` CLI, one
entry under `languages:` in the catalog. Adding a **pattern** means: one doc, one
catalog entry, one folder per language, `make snapshot`.

---

## 4. Documentation

Documentation is plain markdown, read on GitHub, reached by links. The chain is:
root `README.md` (catalogue table) → `docs/patterns/<id>.md` (the academic
write-up) → each language's implementation folder, and each language directory
has its own `README.md` for setup, run and test commands. Nothing is built or
served.

`docs/patterns/<id>.md` keeps the outline the original README established (adapted
from the GoF template), but becomes language-neutral and gains two sections:

1. **Intent** · 2. **Motivation** · 3. **Structure** (diagram) · 4. **Participants**
   (role → responsibility, with one column linking to the class/function in *each*
   language) · 5. **The example** (what the runner does, the expected output block, which the
   validator compares against the committed snapshot)
   · 6. **Consequences** · 7. **Language notes** (new: how idioms change the
   pattern, e.g. lambdas as strategies in Java, first-class functions in
   Python/JS, structural typing in TS) · 8. **Related patterns** · 9. **References**
   (numbered, pointing into `docs/references.md`).

**Diagrams:** migrate the PlantUML sources to **Mermaid class diagrams** embedded in
the markdown. They render natively on GitHub with no Java or image export step, which removes the `assets/images/*.png` maintenance the original had.
PlantUML sources exist for all 11 patterns, so the translation is mechanical.

Diagram rule: **show only the participants of the pattern.** The `Example` class,
the `Output` sink, `ServiceLoader` registration, registries and the CLI are host
plumbing and never appear in a structure diagram. Where the client role matters to
the pattern (Strategy, Chain of Responsibility) it is drawn as a generic `Client`,
not as the runner. One diagram per pattern, language-neutral; if a language's
idiom changes the shape (a lambda replacing a ConcreteStrategy class, for example)
that is described in **Language notes**, not drawn.

The README catalogue table is generated from the catalog by `patterns validate
--write-readme` between two marker comments, so the table can never lie.

---

## 5. Execution and presentation

Four ways to "run and show the output" were weighed:

| Option | How | Cost to host | Chosen |
|---|---|---|---|
| A. CLI orchestrator | `make run P=strategy` | none | **Yes** |
| B. Web app with a live backend | server spawns the four runners | a container with JDK+Python+Node, always running | No |
| C. Static site with recorded output | CI records output, a generated site shows docs, source and output | GitHub Pages | Deferred |
| D. Static site with in-browser execution | JS native, Python via Pyodide, Java via CheerpJ/TeaVM | GitHub Pages | Deferred |

**Decision: A only for now.** Execution is the CLI; presentation is the repository
itself, browsed on GitHub:

* `make run P=strategy` prints the four implementations' output side by side.
  `make run P=strategy L=python` prints one.
* `snapshots/<id>/<language>.txt` is the recorded output, committed and verified by
  CI on every push. A reader without a toolchain reads it there, and the pattern doc
  embeds the same block under **The example**.
* Each language `README.md` explains how to run that language alone, for readers
  who only care about one ecosystem.

Options C and D are dropped from the plan, not ruled out. The layout keeps them
cheap to add later because everything a site would need already exists as data:
the catalog, the docs, the source and the snapshots. Option B stays out; the
examples take no input, so a live backend buys nothing over a recording.

## 6. Testing and CI

Per language (runs in its own job, own cache):

| Language | Unit tests | Coverage gate | Lint / types |
|---|---|---|---|
| Java | JUnit 5 | JaCoCo | `-Xlint:all -Werror` |
| Python | pytest | coverage.py (`--branch`) | ruff, mypy `--strict` |
| TypeScript | vitest | v8 coverage | tsc `--noEmit` strict, eslint |
| JavaScript | `node:test` | c8 | eslint |

Coverage gate, identical in every language: **line (instruction) coverage > 90 %
and branch coverage > 90 %**, enforced by the build so the job fails below the
threshold. This lowers Java's instruction gate from the original 95 % to 90 % so
that all four languages share one rule. Only the CLI entry point (argument parsing
and `main`) may be excluded from the measurement; the runtime, the examples and the
patterns are never excluded.

Cross-cutting (`conformance.yml`): build all four, `patterns validate`, `patterns
check`. Fails on catalog gaps, snapshot drift, or strict-parity mismatch.

Path filters so a Python-only change does not build Java. GitHub Actions is the only
CI; CircleCI from the original is not carried over. Workflows trigger on pushes to
`master` and on pull requests.

---

## 7. Spec-driven development with Spec Kit

The project is developed with [GitHub Spec Kit](https://github.com/github/spec-kit):
a constitution of non-negotiable rules, then one numbered spec per feature, each
taken through *specify → plan → tasks → implement* with the Spec Kit slash commands
in Claude Code. The repository has ten near-identical features (the pattern ports),
which is exactly where a shared spec template and task template pay off.

### 7.1 Setup (Phase 0)

```bash
uv tool install specify-cli          # version checked against the seven-day rule first
specify init --here --integration claude
```

This adds `.specify/` (constitution under `memory/`, templates, scripts) and the
`/speckit-*` commands. Committed to the repo; the CLI itself is a developer tool,
not a dependency of any language project. Specs live under `specs/NNN-<slug>/`
with `spec.md`, `plan.md`, `tasks.md`; each spec is developed on its own branch and
merged into `master`.

### 7.2 Constitution

Written from this plan before any code. It holds the rules that every spec must
obey, so the specs stay short:

1. Language-first code, pattern-first docs, `catalog.yaml` as single source of truth (§2).
2. The in-language contract (`Example`, `Output`, discovery) and the CLI protocol
   (`list`, `run <id>`, `run --all`) (§3).
3. Output conventions: heading line, two-space indent, plain ASCII, deterministic (§3.1).
4. Participant naming follows the reference literature in every language (§3.1).
5. Documentation outline and the diagram rule: Mermaid, participants only (§4).
6. Quality gates: tests per pattern, line and branch coverage above 90 %, lint and
   type checks clean, `patterns check` green (§6).
7. Idiomatic per language; no framework in the host; no shared code between
   languages.
8. Toolchain decisions of §10 (JDK 25, uv, pnpm, GitHub Actions, `master`).

### 7.3 Templates

The default Spec Kit spec template is written for user-facing product features. Two
project templates are derived from it once, in Phase 0, and reused:

* **Pattern spec template** (`.specify/templates/spec-template.md`): the
  definition of done in §7.4 as acceptance criteria, plus the pattern's intent,
  category, participants and expected output block. The learner is the user; the
  user story is "as a reader I can understand pattern X from the doc and see it run
  in each language".
* **Pattern task template**: the fixed task list of §7.4, so `/speckit-tasks`
  produces the same checklist for every pattern and only the pattern-specific items
  vary.

### 7.4 Definition of done for a pattern (what every pattern spec must deliver)

A pattern is done when all of the following hold. The orchestrator's `validate` and
`check` commands verify the mechanical items; review covers the rest.

**Documentation** — `docs/patterns/<id>.md`
- [ ] Every section of the outline in §4 present: Intent, Motivation, Structure,
      Participants, The example, Consequences, Language notes, Related patterns,
      References.
- [ ] Mermaid class diagram showing only the pattern's participants; no `Example`,
      `Output`, registry, `ServiceLoader` or CLI.
- [ ] Participants table maps each role to the class or function in **each** language.
- [ ] Expected output block equals the committed snapshot.
- [ ] Numbered references resolving to `docs/references.md`.

**Implementation** — one per language: `java/`, `python/`, `typescript/`, `javascript/`
- [ ] Idiomatic implementation with participant-based names; fewest classes that
      still show the structure.
- [ ] An `Example` registered for discovery (`META-INF/services`, package
      `example`, registry entry) that writes through `Output` following the output
      conventions.
- [ ] Deterministic output identical across languages, or `parity: loose` in the
      catalog with the reason in the doc.

**Tests** — per language
- [ ] Behaviour tests of the pattern itself.
- [ ] Example test asserting the produced lines.
- [ ] Line coverage > 90 % and branch coverage > 90 % for the language project after
      the addition; lint and type checks clean.

**Integration**
- [ ] Catalog entry with `id`, `icon`, `name`, `category`, `intent`, `doc`, `parity`
      and the four implementation paths.
- [ ] `<runner> list` in each language includes the id; `<runner> run <id>` works.
- [ ] `snapshots/<id>/<language>.txt` committed for each language.
- [ ] `patterns validate` and `patterns check` pass; README catalogue table regenerated.
- [ ] CI green.

### 7.5 The user-facing feature: the CLI

The CLI is the only user-facing feature of the repository, so it is the first spec
and the one the pattern specs depend on.

**Spec 001 – CLI runner.** The host alone: runtime contract, the four language
CLIs, the orchestrator and the Make targets. No pattern is part of this spec.
Acceptance runs against a **fixture example in each language's test tree** (a
`META-INF/services` entry on the Java test classpath, a fixture package that Python
discovery is pointed at, a registry injected into the TypeScript and JavaScript CLIs
under test). The fixtures stay as the CLI's regression tests whatever patterns exist
later. On the empty production catalog, `list` prints an empty array and `run <id>`
exits 2.

User stories:

1. As a learner, I can list the examples available in a given language.
2. As a learner, I can run one example in a given language and read its output.
3. As a learner, I can run all examples of a given language in one command.
4. As a learner, I can run one example in every language and compare the outputs
   side by side.
5. As a maintainer, I can record the outputs as snapshots and have CI tell me when
   an implementation drifts or when languages disagree.

Acceptance criteria:

* Each language CLI supports `list`, `run <id>`, `run --all` with the semantics of
  §3.2; unknown id exits 2 with a one-line message; `list` output is JSON.
* Running from the repo root: `make run P=<id>`, `make run P=<id> L=<lang>`,
  `make run-all L=<lang>`, `make list L=<lang>`, `make snapshot`, `make check`.
* Orchestrator commands `validate`, `run`, `snapshot`, `check` as in §3.2.
* Every language project passes its coverage gate; the CLI entry point may be excluded.

**Spec 002 – Strategy.** The first pattern, and the first use of the pattern spec
template and the definition of done of §7.4 with no host work mixed in. It becomes
the reference for the specs that follow.

**Specs 003–012 – the ten remaining patterns of the original project**, generated
from the pattern template. **Specs 013–028 – the sixteen new patterns** of §11,
in the order listed there. Later additions follow the same route: a new language is
a spec whose acceptance is "all catalogued patterns run and pass `check`".

## 8. Migration from the Java project

Inventory of the original: 11 examples (Abstract Factory, Factory Method, Simple
Factory, Singleton, Adapter, Decorator, Chain of Responsibility, Observer, Strategy,
Template Method, Producer/Consumer), each with README, PlantUML diagram, PNG, tests.

Mechanical steps:

1. Java sources: move packages to `java/src/main/java/com/penapereira/patterns/<id>/`,
   rename `<Id>ExampleRunner` → `<Id>Example`, replace SLF4J trace calls with
   `out.line(...)`, drop `@Component`, register in `META-INF/services`. Tests move
   with them and swap the Spring context for direct instantiation.
2. Pattern READMEs: move to `docs/patterns/<id>.md`, strip Java-specific wording from
   the neutral sections, move it into **Language notes → Java**, convert PlantUML to
   Mermaid.
3. `assets/images/*.png`, Swing UI, `application.properties`, Spring runners: not
   carried over.
4. Producer/Consumer: make the output deterministic (fixed count, join before
   return, print a summary rather than interleaved progress) or mark `parity: loose`.

---

## 9. Phases

**Phase 0 – Skeleton (½ day).** Directory layout, `catalog.yaml` with the 27
patterns of §11 (implementations empty), Makefile, `pnpm-workspace.yaml` and root `package.json`, per-language
project files with zero patterns (build, test, lint and coverage gates wired; the
`list`/`run` CLI itself is spec 001), `.sdkmanrc`,
`.gitignore`, `.editorconfig`, root and per-language READMEs, CI workflows green on
empty projects. Spec Kit initialised in place, constitution written from this plan,
pattern spec and task templates derived (§7). Local git only; the remote is added
later and `master` stays the default branch.

**Phase 1 – Specs 001 and 002: CLI runner, then Strategy (1–1½ days).** *Spec 001 delivered 2026-09-18 on branch `001-cli-runner`.* Spec 001
delivers the per-language CLIs and the orchestrator (`validate`, `run`, `snapshot`,
`check`), accepted against test fixtures. Spec 002 delivers Strategy in all four
languages meeting the definition of done, four snapshots and the generated README
table, with the conformance job green. Together they prove the contract and the
Spec Kit workflow before scaling either.

**Phase 2 – Specs 003–012: the remaining 10 patterns (~½ day each across the four
languages).** *Delivered 2026-09-18, PRs #2–#11. Factory Method, Observer and Producer/Consumer were restructured to the literature's participants and made deterministic; Producer/Consumer parity is strict.* One spec and one branch per pattern from the pattern template. Java is
a move; the other three are fresh idiomatic implementations. A spec closes when the
definition of done (§7.4) holds and the branch is merged into `master`.

**Phase 3 – Specs 013–028: the sixteen new patterns of §11, one pull request
per pattern, merged before the next pattern starts.** *Delivered 2026-09-20, PRs #12–#28 (PR #21 was replaced by #22 after GitHub registered no workflow runs for it). All 27 catalogued patterns are implemented in the four languages.* Each PR delivers the
pattern in all four languages plus its doc and snapshots, and closes only when
the definition of done (§7.4) holds and the four workflows are green. No two
pattern branches are open at the same time, so every spec starts from a
`master` that already contains the previous one.

Per-spec routine (the same steps that delivered Phase 2):

1. `git checkout master && git pull`; create the feature with
   `.specify/scripts/bash/create-new-feature.sh --short-name <id> --number NNN`
   and `git checkout -b NNN-<id>`.
2. Write `specs/NNN-<id>/{spec,plan,tasks}.md` from
   `.specify/templates/pattern-spec-template.md` and
   `pattern-tasks-template.md`; record participant names and the exact
   expected output block in the spec.
3. Fill the catalog entry (four implementation paths) and write
   `docs/patterns/<id>.md` (nine sections, Mermaid participants only,
   Language notes).
4. Implement in Java, Python, TypeScript and JavaScript, tests first, each
   language's checks green, CLI prints the expected block.
5. `make snapshot` (four identical files), `make check`,
   `node tools/runner/bin/patterns.js validate --write-readme`, `make lint`,
   `make test`. **Gate on lint and test before committing.**
6. Mark the tasks done, commit, push, `gh pr create`, wait for the four
   checks, `gh pr merge --merge`, pull `master`, update the progress memory.

Order and status (tick when merged):

| Spec | Pattern | Category | PR |
|---|---|---|---|
| 013 | Bridge | structural | ✅ #12 |
| 014 | Composite | structural | ✅ #13 |
| 015 | Façade | structural | ✅ #14 |
| 016 | Flyweight | structural | ✅ #15 |
| 017 | Protection Proxy | structural | ✅ #16 |
| 018 | Virtual Proxy | structural | ✅ #17 |
| 019 | Builder | creational | ✅ #18 |
| 020 | Prototype | creational | ✅ #19 |
| 021 | Monostate | creational | ✅ #20 |
| 022 | Command | behavioural | ✅ #22 |
| 023 | State | behavioural | ✅ #23 |
| 024 | Iterator | behavioural | ✅ #24 |
| 025 | Mediator | behavioural | ✅ #25 |
| 026 | Memento | behavioural | ✅ #26 |
| 027 | Visitor | behavioural | ✅ #27 |
| 028 | Interpreter | behavioural | ✅ #28 |

Interpreter is last because it is the largest. Unlike Phase 2 there is no
original source: each design comes from Gamma et al. (and Ball & Crawford /
Martin for Monostate), reduced to the fewest participants that show the
structure, with a deterministic example.

**Phase 4 – Review and refactor: one class per file in every language.**
Java already keeps one top-level type per file; Python, TypeScript and
JavaScript put every class of a pattern in one module (up to ten classes in
`abstractfactory/__init__.py`). Phase 4 makes the four trees isomorphic: one
file per participant, named by that language's convention, plus one `example`
file per pattern. The refactor is behaviour-preserving: no snapshot may change,
so `make check` (108 ok) is the safety net for every PR.

Target layout, Strategy as the worked example:

| Language | Folder | Files | Naming |
|---|---|---|---|
| Java | `strategy/` | `Strategy.java`, `ConcreteStrategyA.java`, `ConcreteStrategyB.java`, `Context.java`, `StrategyExample.java` | PascalCase, unchanged |
| Python | `strategy/` | `__init__.py` (re-exports + `example`), `strategy.py` (Protocol), `concrete_strategy_a.py`, `concrete_strategy_b.py`, `context.py`, `example.py` | snake_case of the class name |
| TypeScript | `strategy/` | `strategy.ts` (interface), `concrete-strategy-a.ts`, `concrete-strategy-b.ts`, `context.ts`, `example.ts` | kebab-case of the class name |
| JavaScript | `strategy/` | same as TypeScript with `.js` | kebab-case |

Rules that go into the constitution (Principle IV, amendment 1.1.0):

1. One top-level class, interface or protocol per source file, named after it.
2. The example lives in `<Name>Example.java` / `example.py` / `example.ts` /
   `example.js`; Python's `__init__.py` re-exports the public names and the
   `example` object (discovery is unchanged).
3. Tests mirror Java's two files per pattern: behaviour and example
   (`test_<id>.py` + `test_<id>_example.py`; `<id>.test.ts` + `example.test.ts`;
   likewise `.js`).
4. Cross-references between participants: type-only cycles use
   `from __future__ import annotations` with `TYPE_CHECKING` imports (Python)
   or `import type` (TypeScript); the one runtime cycle (State: the two
   concrete states create each other) uses a function-local import in Python
   and relies on ESM live bindings in TypeScript and JavaScript.
5. `patterns validate` enforces rule 1: it counts top-level declarations per
   file under every implementation path and checks the file name against the
   declared name; a warning during migration, an error once every language is
   migrated.
6. The participants table of each doc links to the participant's own file in
   every language.

Granularity (Luis, 2026-09-20): **one pull request per pattern per language**,
merged before the next starts, cycling Python → TypeScript → JavaScript for
each pattern in catalog order. Spec Kit keeps one spec per language so the
branches are `030-python-<id>`, `031-typescript-<id>`, `032-javascript-<id>`;
each task of those specs is one PR.

| Spec | Scope | PRs |
|---|---|---|
| 029 | Conventions: constitution 1.1.0, `docs/conventions.md`, pattern templates, validator check in warning mode | ✅ #29 |
| 030 | Python, one PR per pattern | 27 |
| 031 | TypeScript, one PR per pattern | 27 |
| 032 | JavaScript, one PR per pattern | 27 |
| 033 | Validator check to error mode; Java review pass (naming, Javadoc, `final`); docs links cross-checked; README regenerated | 1 |

Status per pattern (tick with the PR number when merged):

| Pattern | Python | TypeScript | JavaScript |
|---|---|---|---|
| Abstract Factory | ✅ #30 | ✅ #31 | ✅ #32 |
| Builder | ✅ #33 | ✅ #34 | ✅ #35 |
| Factory Method | ✅ #36 | ✅ #37 | ✅ #38 |
| Simple Factory | ✅ #39 | ✅ #40 | ✅ #41 |
| Monostate | ✅ #42 | ✅ #43 | ✅ #44 |
| Prototype | ✅ #45 | ✅ #46 | ✅ #47 |
| Singleton | ✅ #48 | ✅ #49 | ✅ #50 |
| Adapter | ✅ #51 | ✅ #52 | ✅ #53 |
| Bridge | ✅ #54 | ✅ #55 | ✅ #56 |
| Composite | ✅ #57 | ✅ #58 | ✅ #59 |
| Decorator | ✅ #60 | ✅ #61 | ✅ #62 |
| Façade | ✅ #63 | ✅ #64 | ✅ #65 |
| Flyweight | ✅ #66 | ✅ #67 | ✅ #68 |
| Protection Proxy | ✅ #69 | ✅ #70 | ✅ #71 |
| Virtual Proxy | ✅ #72 | ✅ #73 | ✅ #74 |
| Chain of Responsibility | ✅ #75 | ✅ #76 | ✅ #77 |
| Command | ✅ #78 | ✅ #79 | ✅ #80 |
| Interpreter | ✅ #81 | ✅ #82 | ✅ #83 |
| Iterator | ✅ #84 | ✅ #85 | ✅ #86 |
| Mediator | ✅ #87 | ✅ #88 | ✅ #89 |
| Memento | ✅ #90 | ✅ #91 | ✅ #92 |
| Observer | ✅ #93 | ☐ | ☐ |
| State | ☐ | ☐ | ☐ |
| Strategy | ☐ | ☐ | ☐ |
| Template Method | ☐ | ☐ | ☐ |
| Visitor | ☐ | ☐ | ☐ |
| Producer/Consumer | ☐ | ☐ | ☐ |

Each pattern PR: move that pattern's classes into files, update imports and the
registry or `__init__.py`, split its test file into behaviour and example
files, update its participants links for that language, then `make lint`,
`make test`, `make check` unchanged at 108 ok, `make validate` with no
one-class-per-file warning left for that pattern in that language.

**Phase 5 – Enhancements (open-ended).**
* More concurrency constructs (Monitor, Read/Write lock, a Futures/Promises
  comparison across languages is a natural fit for this repo).
* New languages: Kotlin, Go, Rust. Cost is one dir + one CLI + one catalog entry.
* Presentation beyond GitHub: revisit options C and D of §5 if wanted.
Each enhancement is its own spec.

## 10. Decisions

All confirmed on 2026-09-17. Each row is a constraint for Phase 0 onward.

| # | Decision | Chosen |
|---|---|---|
| 1 | Java host | Plain Java + `ServiceLoader`; no Spring Boot, Lombok or Swing |
| 2 | Java version | JDK 25 LTS, `.sdkmanrc` with `java=25.0.4-tem` (already installed), selected per project with `sdk env` |
| 3 | JS vs TS | Two independent idiomatic projects |
| 4 | Diagrams | Mermaid class diagrams showing only the pattern's participants; no host plumbing (Example, Output, ServiceLoader, CLI) |
| 5 | Default branch | `master`, as in the original; local repository only until a remote is added |
| 6 | Documentation | Plain markdown linked from the root README, browsed on GitHub; no site generator |
| 7 | Presentation | CLI orchestrator plus committed, CI-verified snapshots; no web app or live backend |
| 8 | Orchestrator language | TypeScript in `tools/runner` |
| 9 | Node package manager | pnpm, pinned via `packageManager` |
| 10 | CI | GitHub Actions only; CircleCI dropped |
| 11 | Process | Spec Kit, initialised in place in Phase 0; constitution from this plan; one spec per pattern from a project template (§7) |
| 12 | Coverage gate | Line and branch coverage above 90 % in every language, CLI entry point excludable; replaces the original 95 % / 90 % |
| 13 | First specs | 001 is the CLI runner alone, accepted against test fixtures; 002 is Strategy, the first pattern spec |
| 14 | Catalogue | The 27 patterns of §11: the supplied 25-entry table appended with every original pattern missing from it (Simple Factory, Producer/Consumer); Protection Proxy and Virtual Proxy as two entries; Monostate referenced to Ball & Crawford and Martin; icons carried into the README table |
| 15 | TypeScript version | 6.0.3 until typescript-eslint supports TypeScript 7 (7.0 ships no compiler API; support tracked for 7.1+). Upgrade is a follow-up spec; the two-compiler alias recipe is not used |
| 16 | One class per file | Every language keeps one top-level class/interface/protocol per file named after it; tests split into behaviour and example files; Python `__init__.py` re-exports the public names; enforced by `patterns validate`; one PR per pattern per language (Phase 4). Confirmed 2026-09-20 |

Dependency versions are not pinned in this document; each will be verified as at
least seven days old when the scaffold is created.

---

## 11. Pattern catalogue

Twenty-seven entries: the eleven of the original project (marked *original*) and
sixteen new ones. Categories follow Gamma et al. with one extra category for
concurrency constructs. Icons are stored in the catalog and rendered in the
generated README table.

### Creational

| | Pattern | Id | Intent | Origin |
|---|---|---|---|---|
| 🌰 | Abstract Factory | `abstract-factory` | Provide an interface for creating families of related objects without naming their concrete classes. | original |
| 👷 | Builder | `builder` | Separate the construction of a complex object from its representation so the same process can create different representations. | new |
| 🏭 | Factory Method | `factory-method` | Define an interface for creating an object, but let subclasses decide which class to instantiate. | original |
| 🏗️ | Simple Factory | `simple-factory` | Centralise the creation of related products behind a single method that selects the concrete class. Not in the GoF catalogue; kept from the original. | original |
| 🔂 | Monostate | `monostate` | Share all state among every instance of a class while leaving instantiation unconstrained; a Singleton alternative (Ball and Crawford). | new |
| 🃏 | Prototype | `prototype` | Specify the kinds of objects to create using a prototypical instance, and create new objects by copying it. | new |
| 💍 | Singleton | `singleton` | Ensure a class has exactly one instance and provide a global point of access to it. | original |

### Structural

| | Pattern | Id | Intent | Origin |
|---|---|---|---|---|
| 🔌 | Adapter | `adapter` | Convert the interface of a class into another interface clients expect. | original |
| 🌉 | Bridge | `bridge` | Decouple an abstraction from its implementation so the two can vary independently. | new |
| 🌿 | Composite | `composite` | Compose objects into tree structures and let clients treat individual objects and compositions uniformly. | new |
| 🍧 | Decorator | `decorator` | Attach additional responsibilities to an object dynamically. | original |
| 🎁 | Façade | `facade` | Provide a unified, higher-level interface to a set of interfaces in a subsystem. | new |
| 🍃 | Flyweight | `flyweight` | Use sharing to support large numbers of fine-grained objects efficiently. | new |
| ☔ | Protection Proxy | `protection-proxy` | Control access to an object by checking the caller's rights before forwarding a request. Variant of Proxy. | new |
| 🍬 | Virtual Proxy | `virtual-proxy` | Defer the creation of an expensive object until it is actually needed. Variant of Proxy. | new |

### Behavioural

| | Pattern | Id | Intent | Origin |
|---|---|---|---|---|
| 🐝 | Chain of Responsibility | `chain-of-responsibility` | Pass a request along a chain of handlers until one of them handles it. | original |
| 👫 | Command | `command` | Encapsulate a request as an object, allowing requests to be queued, logged and undone. | new |
| 🎶 | Interpreter | `interpreter` | Given a language, define a representation for its grammar along with an interpreter that uses it. | new |
| 🍫 | Iterator | `iterator` | Provide sequential access to the elements of an aggregate without exposing its underlying representation. | new |
| 💐 | Mediator | `mediator` | Define an object that encapsulates how a set of objects interact, keeping them from referring to each other explicitly. | new |
| 💾 | Memento | `memento` | Capture and externalise an object's internal state so it can be restored later, without violating encapsulation. | new |
| 👓 | Observer | `observer` | Define a one-to-many dependency so that dependents are notified when a subject changes state. | original |
| 🐉 | State | `state` | Allow an object to alter its behaviour when its internal state changes; the object appears to change class. | new |
| 💡 | Strategy | `strategy` | Define a family of interchangeable algorithms and let the client choose one at run time. | original |
| 📝 | Template Method | `template-method` | Define the skeleton of an algorithm and defer some steps to subclasses. | original |
| 🏃 | Visitor | `visitor` | Represent an operation to be performed on the elements of an object structure without changing their classes. | new |

### Concurrency constructs

| | Construct | Id | Problem | Origin |
|---|---|---|---|---|
| 🔄 | Producer/Consumer | `producer-consumer` | Coordinate threads that generate data with threads that process it through a bounded, thread-safe buffer. | original |

Notes:

* **Simple Factory** and **Producer/Consumer** are not in the supplied table. Every
  pattern of the original project is kept, so the supplied table is appended with
  them (decision 14).
* **Protection Proxy** and **Virtual Proxy** are two separate entries (decision 14).
  Both docs cross-reference each other under *Related patterns* and share the Proxy
  participants (Subject, RealSubject, Proxy).
* **Monostate** needs a reference outside GoF: S. Ball and J. Crawford, "Monostate
  Classes: The Power of One", *C++ Report*, 1997, and R. C. Martin, *Agile Software
  Development*, 2003, ch. on Singleton and Monostate. Added to `docs/references.md`.
* Icons for Simple Factory and Producer/Consumer are placeholders chosen here; all
  others are as supplied.
