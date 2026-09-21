from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .receiver import Receiver


class ConcreteCommand:
    """Binds a receiver to an action and knows how to reverse it."""

    def __init__(self, receiver: Receiver, word: str) -> None:
        self._receiver = receiver
        self._word = word

    def execute(self) -> None:
        self._receiver.action(self._word)

    def undo(self) -> None:
        self._receiver.reverse(self._word)

    def describe(self) -> str:
        return f"ConcreteCommand({self._word})"
