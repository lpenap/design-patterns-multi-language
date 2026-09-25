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
3. [Principles](#principles)
4. [Repository layout](#repository-layout)
5. [How it fits together](#how-it-fits-together)
6. [Adding a pattern](#adding-a-pattern)
7. [Future work](#future-work)
8. [References](#references)

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
make run-all L=python # every pattern in one language, in catalogue order
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
| 👷 | [Builder](docs/patterns/builder.md) | Separate the construction of a complex object from its representation so the same process can create different representations. | done | done | done | done |
| 🏭 | [Factory Method](docs/patterns/factory-method.md) | Define an interface for creating an object, but let subclasses decide which class to instantiate. | done | done | done | done |
| 🏗️ | [Simple Factory](docs/patterns/simple-factory.md) | Centralise the creation of related products behind a single method that selects the concrete class. | done | done | done | done |
| 🔂 | [Monostate](docs/patterns/monostate.md) | Share all state among every instance of a class while leaving instantiation unconstrained. | done | done | done | done |
| 🃏 | [Prototype](docs/patterns/prototype.md) | Specify the kinds of objects to create using a prototypical instance, and create new objects by copying it. | done | done | done | done |
| 💍 | [Singleton](docs/patterns/singleton.md) | Ensure a class has exactly one instance and provide a global point of access to it. | done | done | done | done |
| ♻️ | [Object Pool](docs/patterns/object-pool.md) | Reuse a bounded set of expensive-to-create objects by lending them out and taking them back instead of creating and discarding them. | done | done | pending | pending |

### Structural

| | Pattern | Intent | Java | Python | TypeScript | JavaScript |
|---|---|---|---|---|---|---|
| 🔌 | [Adapter](docs/patterns/adapter.md) | Convert the interface of a class into another interface clients expect. | done | done | done | done |
| 🌉 | [Bridge](docs/patterns/bridge.md) | Decouple an abstraction from its implementation so the two can vary independently. | done | done | done | done |
| 🌿 | [Composite](docs/patterns/composite.md) | Compose objects into tree structures and let clients treat individual objects and compositions uniformly. | done | done | done | done |
| 🍧 | [Decorator](docs/patterns/decorator.md) | Attach additional responsibilities to an object dynamically. | done | done | done | done |
| 🎁 | [Façade](docs/patterns/facade.md) | Provide a unified, higher-level interface to a set of interfaces in a subsystem. | done | done | done | done |
| 🍃 | [Flyweight](docs/patterns/flyweight.md) | Use sharing to support large numbers of fine-grained objects efficiently. | done | done | done | done |
| ☔ | [Protection Proxy](docs/patterns/protection-proxy.md) | Control access to an object by checking the caller's rights before forwarding a request. | done | done | done | done |
| 🍬 | [Virtual Proxy](docs/patterns/virtual-proxy.md) | Defer the creation of an expensive object until it is actually needed. | done | done | done | done |

### Behavioural

| | Pattern | Intent | Java | Python | TypeScript | JavaScript |
|---|---|---|---|---|---|---|
| 🐝 | [Chain of Responsibility](docs/patterns/chain-of-responsibility.md) | Pass a request along a chain of handlers until one of them handles it. | done | done | done | done |
| 👫 | [Command](docs/patterns/command.md) | Encapsulate a request as an object, allowing requests to be queued, logged and undone. | done | done | done | done |
| 🎶 | [Interpreter](docs/patterns/interpreter.md) | Given a language, define a representation for its grammar along with an interpreter that uses it. | done | done | done | done |
| 🍫 | [Iterator](docs/patterns/iterator.md) | Provide sequential access to the elements of an aggregate without exposing its underlying representation. | done | done | done | done |
| 💐 | [Mediator](docs/patterns/mediator.md) | Define an object that encapsulates how a set of objects interact, keeping them from referring to each other explicitly. | done | done | done | done |
| 💾 | [Memento](docs/patterns/memento.md) | Capture and externalise an object's internal state so it can be restored later, without violating encapsulation. | done | done | done | done |
| 👓 | [Observer](docs/patterns/observer.md) | Define a one-to-many dependency so that dependents are notified when a subject changes state. | done | done | done | done |
| 🐉 | [State](docs/patterns/state.md) | Allow an object to alter its behaviour when its internal state changes; the object appears to change class. | done | done | done | done |
| 💡 | [Strategy](docs/patterns/strategy.md) | Define a family of interchangeable algorithms and let the client choose one at run time. | done | done | done | done |
| 📝 | [Template Method](docs/patterns/template-method.md) | Define the skeleton of an algorithm and defer some steps to subclasses. | done | done | done | done |
| 🏃 | [Visitor](docs/patterns/visitor.md) | Represent an operation to be performed on the elements of an object structure without changing their classes. | done | done | done | done |
| 🫥 | [Null Object](docs/patterns/null-object.md) | Provide a do-nothing collaborator with the expected interface so clients never test for null. | pending | pending | pending | pending |

### Concurrency constructs

| | Construct | Problem | Java | Python | TypeScript | JavaScript |
|---|---|---|---|---|---|---|
| 🔄 | [Producer/Consumer](docs/patterns/producer-consumer.md) | Coordinate threads that generate data with threads that process it through a bounded, thread-safe buffer. | done | done | done | done |
| 🚦 | [Monitor](docs/patterns/monitor.md) | Bundle shared state with the lock and condition variables that guard it, so callers never synchronise by hand. | pending | pending | pending | pending |
| 📖 | [Read/Write Lock](docs/patterns/read-write-lock.md) | Let many readers share access to a resource while a writer gets it exclusively. | pending | pending | pending | pending |
| 🔮 | [Future/Promise](docs/patterns/future-promise.md) | Represent a result that will be available later, so callers compose and wait on it instead of blocking at once. | pending | pending | pending | pending |
| 🧵 | [Thread Pool](docs/patterns/thread-pool.md) | Run submitted tasks on a fixed set of worker threads instead of creating a thread per task. | pending | pending | pending | pending |
| ⏸️ | [Guarded Suspension](docs/patterns/guarded-suspension.md) | Suspend a call until its precondition holds, then run it. | pending | pending | pending | pending |

### Enterprise

| | Pattern | Intent | Java | Python | TypeScript | JavaScript |
|---|---|---|---|---|---|---|
| 💎 | [Value Object](docs/patterns/value-object.md) | A small immutable object whose equality rests on its value, not its identity. | pending | pending | pending | pending |
| 💰 | [Money](docs/patterns/money.md) | Represent a monetary amount with its currency and exact arithmetic, including allocation that loses no cents. | pending | pending | pending | pending |
| 📦 | [Data Transfer Object](docs/patterns/data-transfer-object.md) | Carry data between layers or processes in one object to reduce the number of calls. | pending | pending | pending | pending |
| 📇 | [Registry](docs/patterns/registry.md) | A well-known object through which other objects find common objects and services. | pending | pending | pending | pending |
| 🔌 | [Plugin](docs/patterns/plugin.md) | Link classes during configuration rather than compilation. | pending | pending | pending | pending |
| 🎭 | [Service Stub](docs/patterns/service-stub.md) | Replace a problematic external service with a stand-in during development and testing. | pending | pending | pending | pending |
| 📜 | [Transaction Script](docs/patterns/transaction-script.md) | Organise business logic as one procedure per request. | pending | pending | pending | pending |
| 🧠 | [Domain Model](docs/patterns/domain-model.md) | An object model of the domain that incorporates both behaviour and data. | pending | pending | pending | pending |
| 🛎️ | [Service Layer](docs/patterns/service-layer.md) | Define an application's boundary with a layer of services that coordinates the domain and exposes the available operations. | pending | pending | pending | pending |
| 🗂️ | [Active Record](docs/patterns/active-record.md) | An object that wraps a row, encapsulates its data access and adds domain logic. | pending | pending | pending | pending |
| 🗺️ | [Data Mapper](docs/patterns/data-mapper.md) | A layer of mappers that moves data between objects and a store while keeping the two independent. | pending | pending | pending | pending |
| 🪪 | [Identity Map](docs/patterns/identity-map.md) | Load each object once by keeping every loaded object in a map keyed by identity. | pending | pending | pending | pending |
| 📝 | [Unit of Work](docs/patterns/unit-of-work.md) | Track the objects affected by a business transaction and commit their changes as one. | pending | pending | pending | pending |
| 🏛️ | [Repository](docs/patterns/repository.md) | Mediate between the domain and the data mapping layer with a collection-like interface. | pending | pending | pending | pending |
| 🔒 | [Optimistic Offline Lock](docs/patterns/optimistic-offline-lock.md) | Detect conflicts between concurrent business transactions with a version check at commit. | pending | pending | pending | pending |
| 🖼️ | [Model-View-Controller](docs/patterns/model-view-controller.md) | Split user-interface interaction into model, view and controller. | pending | pending | pending | pending |
<!-- catalogue:end -->

## Principles

The patterns are not ends in themselves: each exists to honour one or more
design principles, such as *encapsulate what varies* or the *open-closed
principle*. [`docs/principles.md`](docs/principles.md) states those principles
with their sources, and every pattern document names, right after its intent,
the principles it relies on.

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

## Future work

Two catalogues were reviewed and deliberately left out of this repository:
[generative AI patterns](docs/future/genai-patterns.md) and
[API design patterns](docs/future/api-design-patterns.md). Each document records
the candidate patterns, why they do not fit the contract here (no network, no
secrets, byte-exact output in every language) and how a separate project could
build them.

## References

The shared bibliography is in [`docs/references.md`](docs/references.md).
Pattern documents cite it by number.
