# Implementation Plan: Abstract Factory

**Branch**: `003-abstract-factory` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

## Summary

Move Abstract Factory from the original project with the literature's names and implement it in the other three languages, byte-identical output. Same shape as spec 002.

## Constitution Check

All principles PASS as for spec 002: language-first folders, Example registered through the four discovery mechanisms, output conventions, literature names, nine-section doc with participants-only diagram, tests and coverage gates.

## Project Structure

```text
docs/patterns/abstract-factory.md
snapshots/abstract-factory/{java,python,typescript,javascript}.txt
java/src/main/java/com/penapereira/patterns/abstractfactory/
  AbstractFactory ConcreteFactory1 ConcreteFactory2 AbstractProductA AbstractProductB
  ProductA1 ProductA2 ProductB1 ProductB2 AbstractFactoryExample        (+ services line)
java/src/test/java/com/penapereira/patterns/abstractfactory/AbstractFactoryTest AbstractFactoryExampleTest
python/src/patterns/abstractfactory/__init__.py   python/tests/test_abstractfactory.py
typescript/src/abstract-factory/{abstract-factory.ts,example.ts,abstract-factory.test.ts}  (+ registry entry)
javascript/src/abstract-factory/{abstract-factory.js,example.js,abstract-factory.test.js}  (+ registry entry)
```

## Design notes

- **Java**: ten small files, one type each, as the literature draws them. `AbstractProductA`/`B` are interfaces with `name()`.
- **Python**: `AbstractFactory`, `AbstractProductA`, `AbstractProductB` as `Protocol`s; concrete classes do not inherit. Method names `create_product_a`, `create_product_b`, `name`.
- **TypeScript**: three interfaces, six classes; `implements` kept for readability although structural typing makes it optional.
- **JavaScript**: only the concrete classes exist; the abstract types are documented conventions.
- **Client test**: a helper that takes a factory and returns `[factory.createProductA().name(), factory.createProductB().name()]`, run against both factories, proves the client uses abstract types only.
