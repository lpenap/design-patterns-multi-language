from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .component import Component


class Composite:
    """Stores children and delegates the operation to them; child management lives here."""

    def __init__(self) -> None:
        self._children: list[Component] = []

    def add(self, child: Component) -> Composite:
        self._children.append(child)
        return self

    def operation(self) -> str:
        return f"Composite({'+'.join(child.operation() for child in self._children)})"
