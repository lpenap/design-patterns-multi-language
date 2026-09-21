from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .concrete_element_a import ConcreteElementA
    from .concrete_element_b import ConcreteElementB


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
