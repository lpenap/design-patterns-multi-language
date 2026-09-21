from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .visitor import Visitor


class ConcreteElementB:
    def accept(self, visitor: Visitor) -> None:
        visitor.visit_concrete_element_b(self)

    def operation_b(self) -> str:
        return "B"
