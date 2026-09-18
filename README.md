# Design Patterns, Multi-Language

A curated collection of object-oriented design patterns and concurrency
constructs, each implemented in **Java, Python, TypeScript and JavaScript**,
intended as teaching material. Every pattern has one academic write-up that is
language-neutral, one idiomatic implementation per language reduced to the
smallest set of classes that still shows the structure, tests, and a recorded
output that continuous integration verifies is identical across the four
languages.

This is the multi-language iteration of
[java-patterns-and-constructs](https://github.com/lpenap/java-patterns-and-constructs).

## Contents

1. [Quickstart](#quickstart)
2. [Catalogue](#catalogue)
3. [Repository layout](#repository-layout)
4. [How it fits together](#how-it-fits-together)
5. [Adding a pattern](#adding-a-pattern)
6. [References](#references)

## Quickstart

Requirements: JDK 25 through [SDKMAN!](https://sdkman.io/) (`sdk env` in the
repository root selects it), [uv](https://docs.astral.sh/uv/), Node 20.19+
with pnpm (`corepack enable`).

```bash
git clone <this repository>
cd design-patterns-multi-language
sdk env
make setup            # installs every toolchain's dependencies
make test             # every language's tests and coverage gates
make run P=strategy   # one pattern in all four languages, side by side
make run P=strategy L=python
make list L=java
```

Each language can also be used on its own; see the README in `java/`,
`python/`, `typescript/` and `javascript/`.

## Catalogue

Patterns follow the classification of Gamma, Helm, Johnson and Vlissides [1],
plus a category for concurrency constructs. Each row links to the academic
write-up, which links to the implementation in every language. The table is
generated from [`catalog.yaml`](catalog.yaml); do not edit it by hand.

<!-- catalogue:start -->
### Creational

| | Pattern | Intent | Java | Python | TypeScript | JavaScript |
|---|---|---|---|---|---|---|
| 🌰 | [Abstract Factory](docs/patterns/abstract-factory.md) | Provide an interface for creating families of related objects without naming their concrete classes. | done | done | done | done |
| 👷 | [Builder](docs/patterns/builder.md) | Separate the construction of a complex object from its representation so the same process can create different representations. | pending | pending | pending | pending |
| 🏭 | [Factory Method](docs/patterns/factory-method.md) | Define an interface for creating an object, but let subclasses decide which class to instantiate. | done | done | done | done |
| 🏗️ | [Simple Factory](docs/patterns/simple-factory.md) | Centralise the creation of related products behind a single method that selects the concrete class. | pending | pending | pending | pending |
| 🔂 | [Monostate](docs/patterns/monostate.md) | Share all state among every instance of a class while leaving instantiation unconstrained. | pending | pending | pending | pending |
| 🃏 | [Prototype](docs/patterns/prototype.md) | Specify the kinds of objects to create using a prototypical instance, and create new objects by copying it. | pending | pending | pending | pending |
| 💍 | [Singleton](docs/patterns/singleton.md) | Ensure a class has exactly one instance and provide a global point of access to it. | pending | pending | pending | pending |

### Structural

| | Pattern | Intent | Java | Python | TypeScript | JavaScript |
|---|---|---|---|---|---|---|
| 🔌 | [Adapter](docs/patterns/adapter.md) | Convert the interface of a class into another interface clients expect. | pending | pending | pending | pending |
| 🌉 | [Bridge](docs/patterns/bridge.md) | Decouple an abstraction from its implementation so the two can vary independently. | pending | pending | pending | pending |
| 🌿 | [Composite](docs/patterns/composite.md) | Compose objects into tree structures and let clients treat individual objects and compositions uniformly. | pending | pending | pending | pending |
| 🍧 | [Decorator](docs/patterns/decorator.md) | Attach additional responsibilities to an object dynamically. | pending | pending | pending | pending |
| 🎁 | [Façade](docs/patterns/facade.md) | Provide a unified, higher-level interface to a set of interfaces in a subsystem. | pending | pending | pending | pending |
| 🍃 | [Flyweight](docs/patterns/flyweight.md) | Use sharing to support large numbers of fine-grained objects efficiently. | pending | pending | pending | pending |
| ☔ | [Protection Proxy](docs/patterns/protection-proxy.md) | Control access to an object by checking the caller's rights before forwarding a request. | pending | pending | pending | pending |
| 🍬 | [Virtual Proxy](docs/patterns/virtual-proxy.md) | Defer the creation of an expensive object until it is actually needed. | pending | pending | pending | pending |

### Behavioural

| | Pattern | Intent | Java | Python | TypeScript | JavaScript |
|---|---|---|---|---|---|---|
| 🐝 | [Chain of Responsibility](docs/patterns/chain-of-responsibility.md) | Pass a request along a chain of handlers until one of them handles it. | pending | pending | pending | pending |
| 👫 | [Command](docs/patterns/command.md) | Encapsulate a request as an object, allowing requests to be queued, logged and undone. | pending | pending | pending | pending |
| 🎶 | [Interpreter](docs/patterns/interpreter.md) | Given a language, define a representation for its grammar along with an interpreter that uses it. | pending | pending | pending | pending |
| 🍫 | [Iterator](docs/patterns/iterator.md) | Provide sequential access to the elements of an aggregate without exposing its underlying representation. | pending | pending | pending | pending |
| 💐 | [Mediator](docs/patterns/mediator.md) | Define an object that encapsulates how a set of objects interact, keeping them from referring to each other explicitly. | pending | pending | pending | pending |
| 💾 | [Memento](docs/patterns/memento.md) | Capture and externalise an object's internal state so it can be restored later, without violating encapsulation. | pending | pending | pending | pending |
| 👓 | [Observer](docs/patterns/observer.md) | Define a one-to-many dependency so that dependents are notified when a subject changes state. | pending | pending | pending | pending |
| 🐉 | [State](docs/patterns/state.md) | Allow an object to alter its behaviour when its internal state changes; the object appears to change class. | pending | pending | pending | pending |
| 💡 | [Strategy](docs/patterns/strategy.md) | Define a family of interchangeable algorithms and let the client choose one at run time. | done | done | done | done |
| 📝 | [Template Method](docs/patterns/template-method.md) | Define the skeleton of an algorithm and defer some steps to subclasses. | pending | pending | pending | pending |
| 🏃 | [Visitor](docs/patterns/visitor.md) | Represent an operation to be performed on the elements of an object structure without changing their classes. | pending | pending | pending | pending |

### Concurrency constructs

| | Construct | Problem | Java | Python | TypeScript | JavaScript |
|---|---|---|---|---|---|---|
| 🔄 | [Producer/Consumer](docs/patterns/producer-consumer.md) | Coordinate threads that generate data with threads that process it through a bounded, thread-safe buffer. | pending | pending | pending | pending |
<!-- catalogue:end -->

## Repository layout

```
catalog.yaml        single source of truth: patterns, languages, implementation paths
docs/               pattern-first academic documentation, conventions, references
java/               Maven project (JDK 25)            one package per pattern
python/             uv project                        one package per pattern
typescript/         strict TypeScript, tsx, vitest    one folder per pattern
javascript/         plain ESM Node, node:test         one folder per pattern
tools/runner/       orchestrator CLI (TypeScript): validate, run, snapshot, check
snapshots/          recorded output per pattern and language, verified by CI
specs/              Spec Kit feature specifications, one per pattern
Makefile            thin façade over everything above
PLAN.md             architecture, decisions and phases
```

## How it fits together

* **The catalog** lists every pattern, its documentation and where each
  language implements it. Nothing in one language knows about another.
* **The contract.** In every language, a pattern exposes an *Example* with an
  `id` and a `run(out)` operation that writes only through an *Output* sink.
  Each language ships a small CLI with `list`, `run <id>` and `run --all`.
* **The orchestrator** reads the catalog and drives the four CLIs, so
  `make run P=strategy` shows the four outputs side by side, and
  `make check` proves they still match the recorded snapshots and each other.
* **The documentation** is pattern-first and language-neutral, with a Mermaid
  diagram of the participants only and a table mapping each role to the class
  or function in each language. See [`docs/conventions.md`](docs/conventions.md).

## Adding a pattern

Development follows [GitHub Spec Kit](https://github.com/github/spec-kit):
one specification per pattern, created from
`.specify/templates/pattern-spec-template.md`, planned, broken into tasks and
implemented on its own branch. The definition of done is in
[`PLAN.md`](PLAN.md#74-definition-of-done-for-a-pattern-what-every-pattern-spec-must-deliver).
In short: the academic doc with a participants-only diagram, an idiomatic
implementation with tests in each language, line and branch coverage above
90 %, a recorded snapshot per language, and `make validate` and `make check`
green.

## References

The shared bibliography is in [`docs/references.md`](docs/references.md).
Pattern documents cite it by number.
