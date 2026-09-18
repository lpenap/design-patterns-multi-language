# Implementation Plan: Factory Method

**Branch**: `004-factory-method` | **Date**: 2026-09-18 | **Spec**: [spec.md](spec.md)

## Summary

Implement Factory Method with the full literature structure in four languages; byte-identical output. Constitution check: all PASS (same reasoning as specs 002 and 003).

## Project Structure

```text
docs/patterns/factory-method.md · snapshots/factory-method/*.txt
java/.../patterns/factorymethod/ Product ConcreteProductA ConcreteProductB Creator ConcreteCreatorA ConcreteCreatorB FactoryMethodExample (+ services line)
python/src/patterns/factorymethod/__init__.py (Product Protocol; Creator ABC) · tests/test_factorymethod.py
typescript/src/factory-method/{factory-method.ts,example.ts,factory-method.test.ts} (+ registry)
javascript/src/factory-method/{factory-method.js,example.js,factory-method.test.js} (+ registry)
```

## Design notes

- `Creator.anOperation()` is the template method; `factoryMethod()` is protected/abstract where the language allows.
- Python: `abc.ABC` + `@abstractmethod`, so an incomplete subclass fails at instantiation (tested).
- JavaScript: the base `factoryMethod()` throws `Error("ConcreteCreator must implement factoryMethod()")` (tested), the closest a dynamic language gets to an abstract method.
