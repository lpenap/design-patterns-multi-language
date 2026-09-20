"""Composite: treat individual objects and compositions uniformly."""

from __future__ import annotations

from typing import Protocol

from patterns.runtime.contract import Output


class Component(Protocol):
    """The interface for objects in the composition."""

    def operation(self) -> str: ...


class Leaf:
    """A primitive with no children."""

    def __init__(self, name: str) -> None:
        self._name = name

    def operation(self) -> str:
        return f"Leaf({self._name})"


class Composite:
    """Stores children and delegates the operation to them; child management lives here."""

    def __init__(self) -> None:
        self._children: list[Component] = []

    def add(self, child: Component) -> Composite:
        self._children.append(child)
        return self

    def operation(self) -> str:
        return f"Composite({'+'.join(child.operation() for child in self._children)})"


class CompositeExample:
    """The client: manipulates leaves and trees through Component alike."""

    id = "composite"

    def run(self, out: Output) -> None:
        out.line("Executing Composite Pattern Implementation")
        leaf: Component = Leaf("A")
        tree: Component = Composite().add(Leaf("A")).add(Leaf("B")).add(Composite().add(Leaf("C")))
        out.line(f"  {leaf.operation()}")
        out.line(f"  {tree.operation()}")


example = CompositeExample()
