from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .command import Command


class Invoker:
    """Asks commands to carry out requests and keeps the history for undo."""

    def __init__(self) -> None:
        self._history: list[Command] = []

    def execute(self, command: Command) -> None:
        command.execute()
        self._history.append(command)

    def undo(self) -> Command | None:
        """Undo the most recent command and return it, or None if there is none."""
        if not self._history:
            return None
        last = self._history.pop()
        last.undo()
        return last
