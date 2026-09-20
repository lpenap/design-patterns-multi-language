"""Prototype: create new objects by copying a prototypical instance."""

from __future__ import annotations

import copy
from typing import Protocol

from patterns.runtime.contract import Output


class Prototype(Protocol):
    """Declares the interface for cloning itself."""

    def clone(self) -> Prototype: ...

    def describe(self) -> str: ...


class ConcretePrototype1:
    """Copies its own state through copy.copy."""

    def __init__(self, state: str) -> None:
        self._state = state

    def clone(self) -> ConcretePrototype1:
        return copy.copy(self)

    def set_state(self, state: str) -> None:
        self._state = state

    def describe(self) -> str:
        return f"ConcretePrototype1(state={self._state})"


class ConcretePrototype2:
    def __init__(self, state: str) -> None:
        self._state = state

    def clone(self) -> ConcretePrototype2:
        return copy.copy(self)

    def set_state(self, state: str) -> None:
        self._state = state

    def describe(self) -> str:
        return f"ConcretePrototype2(state={self._state})"


class PrototypeExample:
    """The client: creates new objects by asking prototypes to clone themselves."""

    id = "prototype"

    def run(self, out: Output) -> None:
        out.line("Executing Prototype Pattern Implementation")
        original = ConcretePrototype1("alpha")
        clone = original.clone()
        out.line(f"  Original: {original.describe()}")
        out.line(f"  Clone: {clone.describe()}")
        out.line(f"  Clone is a distinct object: {str(clone is not original).lower()}")
        clone.set_state("beta")
        out.line(f"  Clone after setState(beta): {clone.describe()}")
        out.line(f"  Original after the clone changed: {original.describe()}")
        second: Prototype = ConcretePrototype2("gamma")
        out.line(f"  ConcretePrototype2 clone: {second.clone().describe()}")


example = PrototypeExample()
