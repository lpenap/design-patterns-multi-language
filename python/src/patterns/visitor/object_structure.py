from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .element import Element
    from .visitor import Visitor


class ObjectStructure:
    """Enumerates its elements and lets a visitor visit each."""

    def __init__(self) -> None:
        self._elements: list[Element] = []

    def add(self, element: Element) -> None:
        self._elements.append(element)

    def accept(self, visitor: Visitor) -> None:
        for element in self._elements:
            element.accept(visitor)
