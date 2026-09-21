from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .mediator import Mediator


class Colleague:
    """Knows its mediator and communicates with it, never with other colleagues."""

    def __init__(self, mediator: Mediator) -> None:
        self._mediator = mediator
        self._received: list[str] = []

    def send(self, message: str) -> None:
        self._mediator.notify(self, message)

    def receive(self, message: str) -> None:
        self._received.append(message)

    def received(self) -> list[str]:
        return list(self._received)

    def name(self) -> str:
        return type(self).__name__
