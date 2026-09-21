from __future__ import annotations

from typing import TYPE_CHECKING, Protocol

if TYPE_CHECKING:
    from .concrete_element_a import ConcreteElementA
    from .concrete_element_b import ConcreteElementB


class Visitor(Protocol):
    """One visit operation per concrete element class."""

    def visit_concrete_element_a(self, element: ConcreteElementA) -> None: ...

    def visit_concrete_element_b(self, element: ConcreteElementB) -> None: ...
