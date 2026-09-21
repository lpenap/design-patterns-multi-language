from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .colleague import Colleague


class ConcreteMediator:
    """Knows its colleagues and implements the cooperative behaviour: route to the other one."""

    def __init__(self) -> None:
        self._colleague1: Colleague | None = None
        self._colleague2: Colleague | None = None

    def set_colleague1(self, colleague: Colleague) -> None:
        self._colleague1 = colleague

    def set_colleague2(self, colleague: Colleague) -> None:
        self._colleague2 = colleague

    def notify(self, sender: Colleague, message: str) -> None:
        target = self._colleague2 if sender is self._colleague1 else self._colleague1
        if target is not None:
            target.receive(message)
