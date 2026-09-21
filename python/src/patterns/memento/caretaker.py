from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .memento import Memento
    from .originator import Originator


class Caretaker:
    """Keeps mementos safe; never examines their contents (the narrow interface)."""

    def __init__(self) -> None:
        self._history: list[Memento] = []

    def save(self, originator: Originator) -> None:
        self._history.append(originator.create_memento())

    def undo(self, originator: Originator) -> bool:
        """Restore the most recent saved state; False if nothing was saved."""
        if not self._history:
            return False
        originator.restore(self._history.pop())
        return True
