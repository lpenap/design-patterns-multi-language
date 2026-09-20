"""Visitor: define new operations over an object structure without changing its classes."""

from __future__ import annotations

from typing import Protocol

from patterns.runtime.contract import Output


class Visitor(Protocol):
    """One visit operation per concrete element class."""

    def visit_concrete_element_a(self, element: ConcreteElementA) -> None: ...

    def visit_concrete_element_b(self, element: ConcreteElementB) -> None: ...


class Element(Protocol):
    """Accepts a visitor and dispatches to the visit method for its own class."""

    def accept(self, visitor: Visitor) -> None: ...


class ConcreteElementA:
    def accept(self, visitor: Visitor) -> None:
        visitor.visit_concrete_element_a(self)

    def operation_a(self) -> str:
        return "A"


class ConcreteElementB:
    def accept(self, visitor: Visitor) -> None:
        visitor.visit_concrete_element_b(self)

    def operation_b(self) -> str:
        return "B"


class ConcreteVisitor1:
    """Records which element classes it visited."""

    def __init__(self) -> None:
        self._visited: list[str] = []

    def visit_concrete_element_a(self, element: ConcreteElementA) -> None:
        self._visited.append("visited ConcreteElementA")

    def visit_concrete_element_b(self, element: ConcreteElementB) -> None:
        self._visited.append("visited ConcreteElementB")

    def result(self) -> str:
        return ", ".join(self._visited)


class ConcreteVisitor2:
    """Concatenates what each element computes."""

    def __init__(self) -> None:
        self._parts: list[str] = []

    def visit_concrete_element_a(self, element: ConcreteElementA) -> None:
        self._parts.append(element.operation_a())

    def visit_concrete_element_b(self, element: ConcreteElementB) -> None:
        self._parts.append(element.operation_b())

    def result(self) -> str:
        return "+".join(self._parts)


class ObjectStructure:
    """Enumerates its elements and lets a visitor visit each."""

    def __init__(self) -> None:
        self._elements: list[Element] = []

    def add(self, element: Element) -> None:
        self._elements.append(element)

    def accept(self, visitor: Visitor) -> None:
        for element in self._elements:
            element.accept(visitor)


class VisitorExample:
    """The client: creates visitors and applies them to the structure."""

    id = "visitor"

    def run(self, out: Output) -> None:
        out.line("Executing Visitor Pattern Implementation")
        structure = ObjectStructure()
        structure.add(ConcreteElementA())
        structure.add(ConcreteElementB())
        first = ConcreteVisitor1()
        structure.accept(first)
        out.line(f"  ConcreteVisitor1: {first.result()}")
        second = ConcreteVisitor2()
        structure.accept(second)
        out.line(f"  ConcreteVisitor2: {second.result()}")


example = VisitorExample()
