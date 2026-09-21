from __future__ import annotations

from typing import TYPE_CHECKING, Protocol

if TYPE_CHECKING:
    from .visitor import Visitor


class Element(Protocol):
    """Accepts a visitor and dispatches to the visit method for its own class."""

    def accept(self, visitor: Visitor) -> None: ...
