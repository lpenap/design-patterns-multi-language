from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .concrete_element_a import ConcreteElementA
    from .concrete_element_b import ConcreteElementB


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
