from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .visitor import Visitor


class ConcreteElementA:
    def accept(self, visitor: Visitor) -> None:
        visitor.visit_concrete_element_a(self)

    def operation_a(self) -> str:
        return "A"
